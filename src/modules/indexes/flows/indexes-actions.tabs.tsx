import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { FC } from 'react';
import { ActionTab } from '../slices/action-tab';

type IndexesActionTabs = {
  order_book_address: string;
  usdt_master_address: string;
  index_master_address: string;
};

export const IndexesActionTabs: FC<IndexesActionTabs> = ({ usdt_master_address, index_master_address, order_book_address }) => {
  return (
    <Tabs defaultValue='buy' className='w-full'>
      <TabsList className='h-8 w-full rounded-[.5rem] p-0.5 *:rounded-[.375rem] *:text-xs'>
        <TabsTrigger value='buy'>Buy</TabsTrigger>
        <TabsTrigger value='sell'>Sell</TabsTrigger>
      </TabsList>
      <div className='flex h-full w-full flex-col gap-4'>
        <ActionTab
          action='buy'
          addresses={{
            book_address: order_book_address,
            index_master_address: index_master_address,
            usdt_master_address: usdt_master_address,
          }}
        />
        <ActionTab
          action='sell'
          addresses={{
            book_address: order_book_address,
            index_master_address: index_master_address,
            usdt_master_address: usdt_master_address,
          }}
        />
      </div>
    </Tabs>
  );
};
