import { cn } from '@/shared/lib/utils';

type TransactionItemProps = {
  title: string;
  price: number;
  time: string;
  type: 'buy' | 'sell' | 'cancel';
};

export const TransactionItem = ({ title, price, time, type }: TransactionItemProps) => {
  return (
    <div className='flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3'>
      <div className='flex min-w-0 flex-1 items-center'>
        <div
          className={cn(
            'mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full',
            type === 'buy' ? 'bg-green-100 text-green-600' : type === 'sell' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600',
          )}>
          <span className='text-sm font-bold'>{type === 'buy' ? '+' : type === 'sell' ? '-' : 'X'}</span>
        </div>
        <div className='flex min-w-0 flex-1 flex-col gap-2'>
          <div className='truncate text-sm font-medium text-gray-900'>{title}</div>
          <div className='text-xs text-gray-500'>{time}</div>
        </div>
      </div>
      <div
        className={cn(
          'ml-3 flex-shrink-0 text-sm font-semibold',
          type === 'buy' ? 'text-green-600' : type === 'sell' ? 'text-red-600' : 'text-gray-600',
        )}>
        {price > 0 ? '+' : '-'}${Math.abs(price)}
      </div>
    </div>
  );
};
