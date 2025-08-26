import { Address } from '@ton/core';
import type { Event, ResponseGetTrHistory } from '../hooks/api/useTransactions';
import type { TransactionItemProps } from '../slices/transaction-item';
import { isJettonTransfer } from '../utils/utils';

const normalize = (s: string) => Address.parse(s).toString();

const mapEventToTransactionItem = (event: Event, recipientsSet: Set<string>) => {
  const jettonTransferAction = event.actions.find(isJettonTransfer);

  if (!jettonTransferAction) return null;

  const { JettonTransfer, simple_preview } = jettonTransferAction;
  const { amount, jetton, recipient } = JettonTransfer;

  const normalizedRecipient = normalize(recipient.address);
  const isBuy = recipientsSet.has(normalizedRecipient);
  const type = isBuy ? 'buy' : 'sell';

  const numericAmount = Number(amount) / 10 ** jetton.decimals;

  return {
    title: simple_preview.description,
    price: 0,
    amount: numericAmount,
    time: event.timestamp,
    icon: jetton.image,
    type,
  };
};

export const filterTxHistoryByRecipients = (data: ResponseGetTrHistory, recipients: string[]): TransactionItemProps[] => {
  if (!recipients.length) return [];

  const allow = new Set(recipients.map(normalize));

  return data.events
    .filter((event) =>
      event.actions.some((action) => {
        if (!isJettonTransfer(action)) return false;
        const normalizedRecipient = normalize(action.JettonTransfer.recipient.address);
        return allow.has(normalizedRecipient);
      }),
    )
    .map((event) => mapEventToTransactionItem(event, allow))
    .filter((item): item is TransactionItemProps => item !== null);
};
