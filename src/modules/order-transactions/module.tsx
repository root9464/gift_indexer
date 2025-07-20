import TransactionsMock from '@shared/mocks/order-transactions.json';
import { TransactionItem } from './slices/transaction-item';

export const OrderTransactionsModule = () => {
  return (
    <div className='flex flex-col gap-6 py-2'>
      <div className='text-center text-sm font-medium text-gray-500'>Recent Transactions</div>
      <div className='space-y-3'>
        {TransactionsMock.map((transaction) => (
          <TransactionItem
            key={transaction.title}
            title={transaction.title}
            price={transaction.price}
            time={transaction.time}
            type={transaction.type as 'buy' | 'sell' | 'cancel'}
          />
        ))}
      </div>
    </div>
  );
};
