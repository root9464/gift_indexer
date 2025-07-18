import { useWalletInfo } from '@/shared/hooks/api/useWalletInfo';
import { fromNano } from '@ton/core';
import { useTonAddress } from '@tonconnect/ui-react';
import { WalletMenu } from './wallet-menu';

export const Header = () => {
  const address = useTonAddress();
  const { data: walletInfo } = useWalletInfo(address ?? '');
  return (
    <div className='flex items-center justify-between gap-2'>
      <div className='inline-flex w-[calc(100%-80px)] items-center justify-center rounded-2xl border border-gray-300 bg-white px-3 py-2 shadow-xs'>
        <div className='mr-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500'>
          <span className='text-xs font-bold text-white'>T</span>
        </div>
        <div className='flex min-w-0 flex-1 items-center overflow-hidden'>
          <span className='text-sm font-bold whitespace-nowrap text-gray-700'>Tand</span>
          <span className='mx-1 text-sm font-bold text-gray-700'>•</span>
          <span className='text-sm font-bold whitespace-nowrap text-gray-700'>{Number(fromNano(walletInfo?.balance ?? 0n)).toFixed(2)} TON</span>
          <span className='mx-1 text-sm font-bold text-gray-700'>•</span>
          <span className='text-sm font-bold whitespace-nowrap text-orange-500'>🎁 N*</span>
        </div>
      </div>
      <WalletMenu />
    </div>
  );
};
