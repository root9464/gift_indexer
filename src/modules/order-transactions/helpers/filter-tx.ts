import { gateway } from '@/shared/lib/axios';
import type { SmartContractGetSeqnoMethod } from '@/shared/types/ton-api';
import { Address } from '@ton/core';
import type { Event, ResponseGetTrHistory } from '../hooks/api/useTransactions';
import type { TransactionItemProps } from '../slices/transaction-item';
import { isJettonTransfer } from '../utils/utils';

const TSP_DIVIDER = 1000;
const normalize = (s: string) => Address.parse(s).toString();

const fetchPrices = async (order_book_address: string) => {
  const { data } = await gateway.instance.ton.get<SmartContractGetSeqnoMethod>(
    `/blockchain/accounts/${order_book_address}/methods/get_order_book_prices`,
  );
  return data;
};

const mapEventToTransactionItem = (event: Event, allow: Set<string>, ratios: Record<string, number>) => {
  const jettonTransferAction = event.actions.find(isJettonTransfer);

  if (!jettonTransferAction) return null;

  const { JettonTransfer, simple_preview } = jettonTransferAction;
  const { amount, jetton, recipient, sender } = JettonTransfer;

  const symbol = (jetton.symbol ?? '').toUpperCase();
  const recipientAddr = recipient?.address ? normalize(recipient.address) : '';
  const senderAddr = sender?.address ? normalize(sender.address) : '';

  let type: 'buy' | 'sell' | 'cancel' = 'cancel';
  let price = 0;

  if (symbol.includes('FLOOR') && recipientAddr && allow.has(recipientAddr)) {
    type = 'sell';
    const ratio = ratios[recipientAddr] ?? 1;
    price = (Number(amount) / 10 ** jetton.decimals) * ratio;
  }

  if (symbol.includes('USD₮') && senderAddr && !allow.has(senderAddr)) {
    type = 'buy';
    price = Number(amount) / 10 ** 6;
  }

  const usdt = Number(amount) / 10 ** jetton.decimals;

  return {
    title: simple_preview.description,
    price,
    amount: usdt,
    time: event.timestamp,
    icon: jetton.image,
    type,
  };
};

const parseHexRatio = (data: SmartContractGetSeqnoMethod): number => {
  if (!data.success || !Array.isArray(data.stack) || data.stack.length < 3) return 1;
  const hex = data.stack[2].num;
  return parseInt(hex, 16) / TSP_DIVIDER;
};

export const filterTxHistoryByRecipients = async (
  data: ResponseGetTrHistory | null | undefined,
  recipients: string[] | null | undefined,
): Promise<TransactionItemProps[]> => {
  if (!data || !Array.isArray(data.events) || !recipients?.length) return [];

  const allow = new Set(recipients.map(normalize));

  const ratios: Record<string, number> = {};
  await Promise.all(
    recipients.map(async (recipient) => {
      const normalized = normalize(recipient);
      const priceData = await fetchPrices(normalized);
      ratios[normalized] = parseHexRatio(priceData);
    }),
  );

  return data.events
    .filter(
      (event) =>
        Array.isArray(event.actions) &&
        event.actions.some((action) => {
          if (!isJettonTransfer(action)) return false;
          const raw = action.JettonTransfer?.recipient?.address;
          if (!raw) return false;
          const normalizedRecipient = normalize(raw);
          return allow.has(normalizedRecipient);
        }),
    )
    .map((event) => mapEventToTransactionItem(event, allow, ratios))
    .filter((item): item is TransactionItemProps => item !== null);
};
