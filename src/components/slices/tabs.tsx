import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type CategoryTabsProps = {
  defaultValue: string;
  tabs: {
    label: string;
    value: string;
    icon?: React.ReactNode;
    trigger?: React.ReactNode;
  }[];
  tabsContent: {
    value: string;
    content: React.ReactNode;
  }[];
};

export const CategoryTabs = ({ defaultValue, tabs, tabsContent }: CategoryTabsProps) => (
  <Tabs defaultValue={defaultValue} className='w-full'>
    <TabsList className='w-full'>
      {tabs.map((tab) => (
        <TabsTrigger key={tab.value} value={tab.value}>
          {tab.trigger ?? tab.label}
          {tab.icon && <span className='ml-2'>{tab.icon}</span>}
        </TabsTrigger>
      ))}
    </TabsList>
    <div className='flex w-full flex-col gap-4'>
      {tabsContent.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </div>
  </Tabs>
);
