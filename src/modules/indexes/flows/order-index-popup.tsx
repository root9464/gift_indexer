import * as React from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { OrderIndexInfo } from '../slices/oder-index-info';
import { OrderIndexHeader } from '../slices/order-index-header';
import { OrderChartWithTimeFrame } from '../features/order-chart-time-frame';
import { OrderChart } from '../entities/order-chart';
import { IndexesSubpageTabs } from '../features/indexes-subpage-tabs';
import { IndexesActionTabs } from './indexes-actions.tabs';
import ChartDataMock from '@/shared/mocks/indexes-chart.json';
import { OrderTabFlow } from '../slices/orders-tab';


type OrderIndexPopupProps = {
  trigger: React.ReactNode;
  icon: string;
  title: string;
  mcap: number;
  price: number;
  change_price: number;
  type: string
  order_book_address: string
};

export function OrderIndexPopup({ trigger, title, price, change_price, mcap, type, order_book_address }: OrderIndexPopupProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className='mx-auto mb-[55px] h-fit min-h-[634px] w-full max-w-[430px] rounded-t-2xl bg-white p-4 pb-4' swipeable={false}>
        <div className='@max-h-680:overflow-y-auto h-fit'>
          <OrderIndexHeader price={804.2} change={-9.0} />
          <div className='flex flex-col gap-2'>
            <div className='flex h-fit w-full flex-col gap-2'>
              <OrderChartWithTimeFrame initialData={ChartDataMock} Chart={OrderChart} />
                <OrderIndexInfo 
                change_price={change_price}
                mcap={mcap}
                price={price}
                title={title}
                type={type as "up" | "down"}
                key={title}
                />
            </div>
            <IndexesSubpageTabs trade={<IndexesActionTabs order_book_address={order_book_address}/>} order={<OrderTabFlow />} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
