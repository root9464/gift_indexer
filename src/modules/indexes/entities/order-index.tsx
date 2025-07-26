import { OrderIndexPopup } from '../flows/order-index-popup';

type OrderIndexProps = {
  icon: string;
  title: string;
  mcap: number;
  price: number;
  change_price: number;
};

export const OrderIndex = ({ icon, title, mcap, price, change_price }: OrderIndexProps) => {
  return (
    <OrderIndexPopup
      trigger={
        <div className='flex cursor-pointer items-center justify-between rounded-xl border border-transparent px-4 py-4 transition-colors hover:border-gray-200 hover:bg-gray-50'>
          <div className='flex min-w-0 flex-1 items-center'>
            <img src={icon} alt='Market Cap Index' className='mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl' />
            <div className='min-w-0 flex-1'>
              <div className='truncate text-base leading-tight font-semibold text-gray-900'>{title}</div>
              <div className='mt-0.5 text-sm text-gray-500'>Mcap • ${mcap}</div>
            </div>
          </div>
          <div className='ml-4 flex-shrink-0 text-right'>
            <div className='text-lg font-semibold text-gray-900'>${price}</div>
            <div className='text-sm font-medium text-green-500'>{change_price}%</div>
          </div>
        </div>
      }
    />
  );
};
