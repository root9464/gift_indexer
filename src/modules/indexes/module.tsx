import { OrderIndex } from './entities/order-index';
import { useOrder } from './hooks/api/useOrder';

export const IndexesModule = () => {
  const { data: OrderBooks } = useOrder();

  return (
    <div className='flex flex-col gap-2 py-2'>
      <div className='text-xs font-semibold text-gray-500'>INDEXES</div>
      <div className='space-y-2'>
        {OrderBooks &&
          OrderBooks.map((index, t) => (
            <OrderIndex
              key={t}
              icon={index.icon}
              title={index.title}
              mcap={index.mcap}
              price={index.price}
              change_price={index.change_price}
              type={index.type}
              order_book_address={index.order_book_address}
            />
          ))}
      </div>
    </div>
  );
};
