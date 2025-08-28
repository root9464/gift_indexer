import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Skeleton } from '@/components/ui/skeleton';
import ChartDataMock from '@/shared/mocks/indexes-chart.json';
import * as React from 'react';
import { OrderChart } from '../entities/order-chart';
import { IndexesSubpageTabs } from '../features/indexes-subpage-tabs';
import { OrderChartWithTimeFrame } from '../features/order-chart-time-frame';
import { useOrderBookPair, type OrderBookAddresses } from '../hooks/api/useOrderBookPair';
import { OrderIndexInfo } from '../slices/oder-index-info';
import { OrderIndexHeader } from '../slices/order-index-header';
import { IndexesActionTabs } from './indexes-actions.tabs';
import { OrderTabFlow } from './orders-tab';

type OrderIndexPopupProps = {
  trigger: React.ReactNode;
  icon: string;
  title: string;
  mcap: number;
  price: number;
  change_price: number;
  type: string;
  order_book_address: string;
};

const isValidOrderBookInfo = (data: unknown): data is OrderBookAddresses => {
  if (!data || typeof data !== 'object') return false;
  const v = data as Record<string, unknown>;
  const keys = ['owner_address', 'admin_address', 'book_minter_address', 'usdt_master_address', 'index_master_address'] as const;
  return keys.every((k) => typeof v[k] === 'string' && (v[k] as string).trim() !== '');
};

export function OrderIndexPopup({ trigger, title, price, change_price, mcap, type, order_book_address }: OrderIndexPopupProps) {
  const {
    data: OrderBookInfo,
    isSuccess: isOrderBookInfoSuccess,
    isLoading: isOrderBookLoading,
    isError: isOrderBookError,
  } = useOrderBookPair(order_book_address);

  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className='mx-auto mb-[55px] h-fit min-h-[634px] w-full max-w-[430px] rounded-t-2xl bg-white p-4 pb-4' swipeable={false}>
        <div className='@max-h-680:overflow-y-auto h-fit'>
          <OrderIndexHeader price={804.2} change={-9.0} />
          <div className='flex flex-col gap-2'>
            <div className='flex h-fit w-full flex-col gap-2'>
              <OrderChartWithTimeFrame initialData={ChartDataMock} Chart={OrderChart} />
              <OrderIndexInfo change_price={change_price} mcap={mcap} price={price} title={title} type={type as 'up' | 'down'} key={title} />
            </div>
            <IndexesSubpageTabs
              trade={
                <>
                  {isOrderBookInfoSuccess && isValidOrderBookInfo(OrderBookInfo) && (
                    <IndexesActionTabs
                      order_book_address={order_book_address}
                      usdt_master_address={OrderBookInfo.usdt_master_address}
                      index_master_address={OrderBookInfo.index_master_address}
                    />
                  )}
                  {(isOrderBookLoading || isOrderBookError) && <Skeleton className='h-20 w-full' />}
                </>
              }
              order={<OrderTabFlow order_book_address={order_book_address} />}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
