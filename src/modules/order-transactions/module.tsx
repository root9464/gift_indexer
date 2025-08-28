import { Skeleton } from '@/components/ui/skeleton';
import { useTonAddress } from '@tonconnect/ui-react';
import { useOrder } from '../indexes/hooks/api/useOrder';
import { filterTxHistoryByRecipients } from './helpers/filter-tx';
import { useTransaction } from './hooks/api/useTransactions';
import { TransactionItem } from './slices/transaction-item';

export const OrderTransactionsModule = () => {
  const address = useTonAddress();
  const { data: OrderBooks } = useOrder();
  const {
    data: transactions,
    isSuccess: isSuccessTransactions,
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions,
  } = useTransaction(address);

  const orderBookAddresses = OrderBooks?.map((orderBook) => orderBook.order_book_address);
  const serializedTransactions = filterTxHistoryByRecipients(transactions!, orderBookAddresses ?? [], 1);

  return (
    <div className='flex flex-col gap-6 py-2'>
      <div className='max-h-[500px] space-y-3 overflow-auto'>
        {isSuccessTransactions &&
          serializedTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.title}
              title={transaction.title}
              price={transaction.price}
              time={transaction.time}
              icon={transaction.icon}
              amount={transaction.amount}
              type={transaction.type as 'buy' | 'sell' | 'cancel'}
            />
          ))}

        {(isErrorTransactions || isLoadingTransactions) && <Skeleton className='h-[500px] w-full' />}
      </div>
    </div>
  );
};
