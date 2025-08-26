import { cn } from '@/shared/lib/utils';

export type TransactionItemProps = {
  title: string;
  price: number;
  amount: number;
  time: number;
  icon: string;
  type: 'buy' | 'sell' | 'cancel';
};

export const TransactionItem = ({ title, price, amount, time, icon, type }: TransactionItemProps) => {
  return (
    <div className='grid w-full grid-cols-[48px_2fr_1fr] items-center justify-between gap-4 rounded-xl px-4 py-2.5'>
      <img className='flex size-[48px] flex-1 items-center rounded-full' src={icon} alt={title} />
      <div className='flex w-full grow flex-col'>
        <p className='font-medium'>
          <span className={cn('text-[17px]', type === 'buy' ? 'text-[#34C759]' : type === 'sell' ? 'text-[#FF3B30]' : 'text-gray-600')}>
            {type === 'buy' ? 'Buy' : type === 'sell' ? 'Sell' : 'Cancel'}
          </span>{' '}
          · {amount}
        </p>
        <p className='text-[15px] text-[#707579]'>{time}</p>
      </div>
      <div className='flex w-full flex-col place-items-end gap-0.5'>
        <p className='text-[17px]'>${price}</p>
        <p className={cn('text-[15px]', type === 'buy' ? 'text-[#34C759]' : type === 'sell' ? 'text-[#FF3B30]' : 'text-gray-600')}>USDT</p>
      </div>
    </div>
  );
};
