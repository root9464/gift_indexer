import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BuyTab } from '../slices/buy-tab';
import { SellTab } from '../slices/sell-tab';

export const IndexesActionTabs = () => (
  <Tabs defaultValue='buy' className='w-full'>
    <TabsList className='h-8 w-full rounded-[.5rem] p-0.5 *:rounded-[.375rem] *:text-xs'>
      <TabsTrigger value='buy'>Buy</TabsTrigger>
      <TabsTrigger value='sell'>Sell</TabsTrigger>
    </TabsList>
    <div className='flex h-full w-full flex-col gap-4'>
      <BuyTab />
      <SellTab />
    </div>
  </Tabs>
);
