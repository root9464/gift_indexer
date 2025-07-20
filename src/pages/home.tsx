import { PageLayout } from '@/components/layout/page';
import { Header } from '@/components/slices/header';
import { CategoryTabs } from '@/components/slices/tabs';
import { WalletMenu } from '@/components/slices/wallet-menu';
import { IndexesModule } from '@/modules/indexes/module';
import { OrderTransactionsModule } from '@/modules/order-transactions/module';
import { WalletStatsModule } from '@/modules/wallet-stats/module';

const Description = () => (
  <div className='relative mx-auto w-full max-w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 p-4 text-white'>
    <div className='relative z-10 flex flex-col gap-2'>
      <div className='text-xl font-bold'>One Token - All Telegram Gifts!</div>
      <div className='text-sm opacity-90'>Easy way to invest in Telegram assets market</div>
      <WalletMenu />
    </div>
    <div className='absolute top-4 right-8 h-32 w-32 rounded-full border border-white/20'></div>
    <div className='absolute -top-8 -right-8 h-24 w-24 rounded-full border border-white/10'></div>
  </div>
);

export default function HomePage() {
  return (
    <PageLayout>
      <Header />
      <Description />
      <CategoryTabs
        defaultValue='balance'
        tabs={[
          { label: 'Balance', value: 'balance' },
          { label: 'Transactions', value: 'transactions' },
        ]}
        tabsContent={[
          {
            value: 'balance',
            content: (
              <>
                <WalletStatsModule />
                <IndexesModule />
              </>
            ),
          },
          { value: 'transactions', content: <OrderTransactionsModule /> },
        ]}
      />
    </PageLayout>
  );
}
