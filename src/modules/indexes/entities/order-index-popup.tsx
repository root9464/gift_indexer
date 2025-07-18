import * as React from 'react';

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import ChartDataMock from '@/shared/mocks/indexes-chart.json';
import { OrderIndexHeader } from '../slices/order-index-header';
import { OrderChart } from './order-chart';

type OrderIndexPopupProps = {
  trigger: React.ReactNode;
};

export function OrderIndexPopup({ trigger }: OrderIndexPopupProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className='mx-auto mb-[55px] min-h-[510px] w-full max-w-[430px] rounded-t-2xl bg-white p-4 pb-4' swipeable={false}>
        <OrderIndexHeader />
        <div className='flex flex-col gap-4'>
          <OrderChart chartData={ChartDataMock} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
