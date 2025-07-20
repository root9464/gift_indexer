import { OrderIndex } from './entities/order-index';

import IndexesMock from '@shared/mocks/indexes.json';

export const IndexesModule = () => {
  return (
    <div className='flex flex-col gap-2 py-2'>
      <div className='text-xs font-semibold text-gray-500'>INDEXES</div>
      <div className='space-y-2'>
        {IndexesMock.map((index) => (
          <OrderIndex key={index.title} {...index} />
        ))}
      </div>
    </div>
  );
};
