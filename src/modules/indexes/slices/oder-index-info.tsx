import { cn } from '@/shared/lib/utils';

export type OrderIndexInfoProps = {
  title: string;
  mcap: number;
  price: number;
  change_price: number;
  type: 'up' | 'down';
};

export const OrderIndexInfo = ({  title, mcap, price, change_price, type }: OrderIndexInfoProps) => {
  return (
    <div className='grid w-full grid-cols-[48px_2fr_1fr] items-center justify-between px-5 pt-2'>
      {/* <img src={icon} alt={title} className='size-8 items-center justify-center rounded-lg' /> */}
      <div  className='size-8 items-center justify-center rounded-lg bg-lime-500'/>
      <div className='flex-1'>
        <div className='text-sm font-bold text-gray-800'>{title}</div>
        <div className='text-xs text-gray-500'>Mcap • ${mcap}</div>
      </div>
      <div className='flex w-full flex-col place-items-end gap-0.5'>
        <p className='text-sm'>${price}</p>
        <p className={cn('text-xs', type === 'up' ? 'text-[#34C759]' : 'text-[#FF3B30]')}>
          {type === 'up' ? '+' : '-'}
          {change_price}
        </p>
      </div>
    </div>
  );
};
