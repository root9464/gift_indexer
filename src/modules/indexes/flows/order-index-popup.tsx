import * as React from 'react';

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { OrderIndexInfo, type OrderIndexInfoProps } from '../slices/oder-index-info';
import { OrderIndexHeader } from '../slices/order-index-header';

import { OrderChartWithTimeFrame } from '../features/order-chart-time-frame';

import { OrderChart } from '../entities/order-chart';
import { IndexesSubpageTabs } from '../features/indexes-subpage-tabs';
import { IndexesActionTabs } from './indexes-actions.tabs';

import { INDEXES_MOCK } from '@/shared/mocks/indexes';
import ChartDataMock from '@/shared/mocks/indexes-chart.json';
import { OrderTabFlow } from '../slices/orders-tab';

type OrderIndexPopupProps = {
  trigger: React.ReactNode;
};

export function OrderIndexPopup({ trigger }: OrderIndexPopupProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className='mx-auto mb-[55px] h-fit min-h-[634px] w-full max-w-[430px] rounded-t-2xl bg-white p-4 pb-4' swipeable={false}>
        <div className='@max-h-680:overflow-y-auto h-fit'>
          <OrderIndexHeader price={804.2} change={-9.0} />
          <div className='flex flex-col gap-2'>
            <div className='flex h-fit w-full flex-col gap-2'>
              <OrderChartWithTimeFrame initialData={ChartDataMock} Chart={OrderChart} />
              <OrderIndexInfo {...(INDEXES_MOCK[0] as OrderIndexInfoProps)} />
            </div>
            <IndexesSubpageTabs trade={<IndexesActionTabs />} order={<OrderTabFlow />} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
