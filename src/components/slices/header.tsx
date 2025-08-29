import { useTonBlanace } from '@/shared/hooks/api/useTonBalance';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { fromNano } from '@ton/core';
import { useTonAddress } from '@tonconnect/ui-react';

export const Header = () => {
  const address = useTonAddress();
  const { tgWebAppData } = useLaunchParams();
  const { data: userBalance, isSuccess: isUserBalanceSucess } = useTonBlanace(address ?? '');

  return (
    <div className='flex items-center justify-center gap-2'>
      <div className='inline-flex w-fit items-center justify-center rounded-2xl border border-gray-300 bg-white px-3 py-2 shadow-xs'>
        {tgWebAppData && tgWebAppData.user && tgWebAppData.user.photo_url ? (
          <div className='mr-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500'>
            <img className='h-5 w-5 rounded-full' src={tgWebAppData.user.photo_url} alt={tgWebAppData.user.first_name} />
          </div>
        ) : (
          <div className='mr-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500'>
            <span className='text-xs font-bold text-white'>T</span>
          </div>
        )}
        <div className='flex min-w-0 flex-1 items-center overflow-hidden'>
          <span className='text-sm font-bold whitespace-nowrap text-gray-700'>{tgWebAppData?.user?.first_name || 'Anonymous'}</span>
          <span className='mx-1 text-sm font-bold text-gray-700'>•</span>
          {isUserBalanceSucess && userBalance?.balance > 0 ? (
            <span className='text-sm font-bold whitespace-nowrap text-gray-700'>
              {Number(fromNano(userBalance?.balance ?? 0n)).toFixed(2)} TON
            </span>
          ) : (
            <span className='text-sm font-bold whitespace-nowrap text-gray-700'>0 TON</span>
          )}
          <span className='mx-1 text-sm font-bold text-gray-700'>•</span>
          <span className='text-sm font-bold whitespace-nowrap text-orange-500'>🎁 N*</span>
        </div>
      </div>
    </div>
  );
};
