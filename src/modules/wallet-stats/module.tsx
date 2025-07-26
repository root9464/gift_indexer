import { Balance } from './entities/balance';
import { InfoTooltip } from './slices/info-tooltip';

export const WalletStatsModule = () => {
  return (
    <div className='mb-6 flex w-full flex-col gap-3 text-center'>
      <div className='flex items-center justify-center gap-2 text-sm font-bold text-gray-500'>
        Wallet
        <InfoTooltip />
      </div>
      <Balance />
      <div className='text-sm text-gray-500'>N* Index tokens</div>
    </div>
  );
};
