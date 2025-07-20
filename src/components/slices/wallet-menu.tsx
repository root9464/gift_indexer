import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/shared/lib/utils';
import { copyClipboard } from '@/shared/utils/utils';
import { ReactComponent as CopyIcon } from '@assets/svg/copy-icon.svg';
import { ReactComponent as DisconectIcon } from '@assets/svg/disconect-icon.svg';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { Button } from '../ui/button';

export const WalletMenu = () => {
  const address = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const connectWallet = () => tonConnectUI.openModal();
  const disconnectWallet = () => tonConnectUI.disconnect();

  const shortAddress = address.slice(0, 5) + '...' + address.slice(-4);
  const longAddress = address.slice(0, 10) + '...' + address.slice(-10);

  return (
    <>
      {address ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              className={cn(
                'inline-flex h-[38px] w-fit items-center justify-center rounded-2xl',
                'border border-green-300 bg-white px-3 py-4 text-green-500 shadow-sm transition-colors',
                'hover:border-green-400 hover:bg-green-50 hover:text-green-500',
              )}>
              {shortAddress}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='relative min-w-48 rounded-xl border-gray-200 bg-white p-0 shadow-sm'>
            <div className='flex flex-col gap-1 border-b border-gray-200 px-4 py-2'>
              <DropdownMenuLabel className='px-0 text-sm font-medium text-gray-800'>Wallet connected</DropdownMenuLabel>
              <span className='text-xs text-gray-500'>{longAddress}</span>
            </div>
            <div className='flex w-full flex-col'>
              <DropdownMenuItem className='flex w-full items-center gap-2 rounded-none px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50'>
                <CopyIcon className='stroke-gray-700' />
                <Button variant='ghost' className='p-0 text-sm text-gray-700' onClick={() => copyClipboard(address)}>
                  Copy address
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className='flex w-full items-center gap-2 rounded-none px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50'>
                <DisconectIcon className='stroke-red-600' />
                <Button variant='ghost' className='p-0 text-sm text-red-600 hover:bg-red-50 hover:text-red-600' onClick={disconnectWallet}>
                  Disconnect
                </Button>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          variant='outline'
          className='inline-flex h-[38px] w-fit items-center justify-center rounded-2xl border border-blue-500 bg-white px-3 py-4 text-sm text-blue-500 shadow-sm transition-colors hover:border-blue-400'
          onClick={connectWallet}>
          Connect TON
        </Button>
      )}
    </>
  );
};
