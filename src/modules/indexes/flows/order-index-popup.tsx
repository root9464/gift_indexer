import * as React from 'react';

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { OrderIndexInfo } from '../slices/oder-index-info';
import { OrderIndexHeader } from '../slices/order-index-header';

import { OrderChartWithTimeFrame } from '../features/order-chart-time-frame';

import { OrderChart } from '../entities/order-chart';
import { IndexesSubpageTabs } from '../features/indexes-subpage-tabs';
import { AllOrders } from '../slices/all-orders';
import { IndexesActionTabs } from './indexes-actions.tabs';

import ChartDataMock from '@/shared/mocks/indexes-chart.json';
import IndexesMock from '@shared/mocks/indexes.json';

type OrderIndexPopupProps = {
  trigger: React.ReactNode;
};

export function OrderIndexPopup({ trigger }: OrderIndexPopupProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className='mx-auto mb-[55px] min-h-[634px] w-full max-w-[430px] rounded-t-2xl bg-white p-4 pb-4' swipeable={false}>
        <OrderIndexHeader price={804.2} change={-9.0} lastPrice={504.2} />
        <div className='flex flex-col gap-5'>
          <div className='flex h-fit w-full flex-col gap-2'>
            <div className='mb-2 ml-3 text-xs text-gray-500'>Price Dynamic</div>
            <OrderChartWithTimeFrame initialData={ChartDataMock} Chart={OrderChart} />
            <OrderIndexInfo {...IndexesMock[0]} />
          </div>
          <IndexesSubpageTabs trade={<IndexesActionTabs />} order={<AllOrders />} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
