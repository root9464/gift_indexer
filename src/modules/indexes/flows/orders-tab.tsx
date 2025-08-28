import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { FC } from 'react';
import { CancelOrder } from '../features/cancel-order';
import { AllOrders, OrderItem } from '../slices/all-orders';

type OrderTabFlowProps = {
  order_book_address: string;
};

export const OrderTabFlow: FC<OrderTabFlowProps> = ({ order_book_address }) => (
  <Tabs defaultValue='orders' className='w-full'>
    <TabsList className='h-8 w-full rounded-[.5rem] p-0.5 *:rounded-[.375rem] *:text-xs'>
      <TabsTrigger value='orders'>Order books</TabsTrigger>
      <TabsTrigger value='my_orders'>My orders</TabsTrigger>
    </TabsList>
    <div className='flex h-full w-full flex-col gap-4'>
      <TabsContent value='orders' className='flex h-full min-h-[230px] w-full flex-col gap-3'>
        <AllOrders />
      </TabsContent>
      <TabsContent value='my_orders' className='flex h-full min-h-[230px] w-full flex-col justify-between gap-3'>
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <div className='text-xs font-medium text-gray-700'>Order book</div>
          </div>
          <OrderItem symbol='CAP' address='EQBzcE4-5qeADB5qeADB5qeADBkx' amount={243.06} price={804.2} />
        </div>
        <div className='flex flex-col gap-3'>
          <div className='w-full text-center text-sm font-medium text-purple-500'>Exchange Rate $0.6202</div>
          <div className='flex items-center justify-center gap-2 text-xs text-gray-500'>
            <span className='flex h-3 w-3 items-center justify-center rounded-full border border-gray-400 text-xs'>i</span>
            <span>Price will change in 2 h 49 m</span>
          </div>
        </div>
        <CancelOrder order_book_address={order_book_address} />
      </TabsContent>
    </div>
  </Tabs>
);
