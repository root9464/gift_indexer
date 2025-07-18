import { Balance } from './entities/balance';

export const WalletStatsModule = () => {
  return (
    <div className='mb-6 flex w-full flex-col gap-3 text-center'>
      <div className='flex items-center justify-center gap-2 text-sm font-bold text-gray-500'>
        Wallet
        <div className='flex h-4 w-4 items-center justify-center rounded-full bg-gray-300'>
          <span className='text-xs font-bold text-white'>?</span>
        </div>
      </div>
      <Balance />
      <div className='text-sm text-gray-500'>N* Index tokens</div>
    </div>
  );
};
