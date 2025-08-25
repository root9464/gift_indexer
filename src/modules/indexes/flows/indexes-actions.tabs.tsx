import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { FC } from 'react';
import { useOrderBookPair, type OrderBookAddresses } from '../hooks/api/useOrderBookPair';
import { ActionTab } from '../slices/action-tab';

type IndexesActionTabsProps = {
  order_book_address: string;
};

const isValidOrderBookInfo = (data: unknown): data is OrderBookAddresses => {
  if (!data || typeof data !== 'object') return false;
  const v = data as Record<string, unknown>;
  const keys = ['owner_address', 'admin_address', 'book_minter_address', 'usdt_master_address', 'index_master_address'] as const;
  return keys.every((k) => typeof v[k] === 'string' && (v[k] as string).trim() !== '');
};

export const IndexesActionTabs: FC<IndexesActionTabsProps> = ({ order_book_address }) => {
  const { data: OrderBookInfo, isSuccess: isOrderBookInfoSuccess } = useOrderBookPair(order_book_address);
  console.log(OrderBookInfo, 'OrderBookInfo');
  console.log(order_book_address, 'order_book_address');

  return (
    <Tabs defaultValue='buy' className='w-full'>
      <TabsList className='h-8 w-full rounded-[.5rem] p-0.5 *:rounded-[.375rem] *:text-xs'>
        <TabsTrigger value='buy'>Buy</TabsTrigger>
        <TabsTrigger value='sell'>Sell</TabsTrigger>
      </TabsList>
      <div className='flex h-full w-full flex-col gap-4'>
        {isOrderBookInfoSuccess && isValidOrderBookInfo(OrderBookInfo) && (
          <>
            <ActionTab
              action='buy'
              addresses={{
                book_address: order_book_address,
                index_master_address: OrderBookInfo.index_master_address,
                usdt_master_address: OrderBookInfo.usdt_master_address,
              }}
            />
            <ActionTab
              action='sell'
              addresses={{
                book_address: order_book_address,
                index_master_address: OrderBookInfo.index_master_address,
                usdt_master_address: OrderBookInfo.usdt_master_address,
              }}
            />
          </>
        )}
      </div>
    </Tabs>
  );
};
