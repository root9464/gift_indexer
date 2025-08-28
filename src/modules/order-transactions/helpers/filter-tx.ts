import { Address } from '@ton/core';
import type { Event, ResponseGetTrHistory } from '../hooks/api/useTransactions';
import type { TransactionItemProps } from '../slices/transaction-item';
import { isJettonTransfer } from '../utils/utils';

const normalize = (s: string) => Address.parse(s).toString();

const mapEventToTransactionItem = (event: Event, allow: Set<string>, ratio: number) => {
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
    price = (Number(amount) / 10 ** jetton.decimals) * ratio;
  }

  if (symbol.includes('USD₮') && senderAddr && !allow.has(senderAddr)) {
    type = 'buy';
    price = Number(amount) / 10 ** jetton.decimals;
  }

  const usdt = Number(amount) / 10 ** jetton.decimals;

  return {
    title: simple_preview.description,
    price: price,
    amount: usdt,
    time: event.timestamp,
    icon: jetton.image,
    type,
  };
};

export const filterTxHistoryByRecipients = (
  data: ResponseGetTrHistory | null | undefined,
  recipients: string[] | null | undefined,
  ratio: number,
): TransactionItemProps[] => {
  if (!data || !Array.isArray(data.events) || !recipients?.length) return [];

  const allow = new Set(recipients.map(normalize));

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
    .map((event) => mapEventToTransactionItem(event, allow, ratio))
    .filter((item): item is TransactionItemProps => item !== null);
};
