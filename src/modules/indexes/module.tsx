import { OrderIndex } from './entities/order-index';
import { useOrder } from './hooks/api/useOrder';

export const IndexesModule = () => {

  const { data } = useOrder()

  return (
    <div className='flex flex-col gap-2 py-2'>
      <div className='text-xs font-semibold text-gray-500'>INDEXES</div>
      <div className='space-y-2'>
        {data && data.map((index) => (
          <OrderIndex key={index.title} {...index} />
        ))}
      </div>
    </div>
  );
};
