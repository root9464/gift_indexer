import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/shared/lib/utils';
import type { ReactNode } from 'react';

type IndexesSubpageTabsProps = {
  trade: Readonly<ReactNode>;
  order: Readonly<ReactNode>;
};

export const IndexesSubpageTabs = ({ trade, order }: IndexesSubpageTabsProps) => {
  return (
    <Tabs defaultValue='trade' className='mb-2'>
      <TabsList className='flex w-full flex-none justify-start gap-3 bg-transparent'>
        <TabsTrigger
          value='trade'
          className={cn(
            'rounded-none border-b-2 border-transparent px-1 py-1 text-sm font-bold whitespace-nowrap text-gray-500 shadow-none transition-colors',
            'flex-none data-[state=active]:bg-transparent data-[state=active]:shadow-none',
            'data-[state=active]:border-b-blue-500 data-[state=active]:text-blue-500',
          )}>
          Trade
        </TabsTrigger>
        <TabsTrigger
          value='order'
          className={cn(
            'rounded-none border-b-2 border-transparent px-1 py-1 text-sm font-bold whitespace-nowrap text-gray-500 shadow-none transition-colors',
            'flex-none data-[state=active]:bg-transparent data-[state=active]:shadow-none',
            'data-[state=active]:border-b-blue-500 data-[state=active]:text-blue-500',
          )}>
          Order
        </TabsTrigger>
      </TabsList>
      <div className='flex w-full'>
        <TabsContent value='trade'>{trade}</TabsContent>
        <TabsContent value='order'>{order}</TabsContent>
      </div>
    </Tabs>
  );
};
