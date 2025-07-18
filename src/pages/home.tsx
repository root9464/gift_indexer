import { PageLayout } from '@/components/layout/page';
import { Header } from '@/components/slices/header';
import { CategoryTabs } from '@/components/slices/tabs';
import { IndexesModule } from '@/modules/indexes/module';
import { WalletStatsModule } from '@/modules/wallet-stats/module';

const Description = () => (
  <div className='relative mx-auto w-full max-w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 p-4 text-white'>
    <div className='relative z-10'>
      <div className='mb-1 text-xl font-bold'>One Token - All Telegram Gifts!</div>
      <div className='mb-4 text-sm opacity-90'>Easy way to invest in Telegram assets market</div>
      <button className='rounded-full bg-white px-6 py-2 text-sm font-bold text-purple-700 transition-colors hover:bg-gray-100'>
        Exchange Index Tokens
      </button>
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
          { value: 'transactions', content: <div>Transactions</div> },
        ]}
      />
    </PageLayout>
  );
}
