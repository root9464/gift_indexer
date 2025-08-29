import { Skeleton } from '@/components/ui/skeleton';
import { TabsContent } from '@/components/ui/tabs';
import { useJettonWallet } from '@/shared/hooks/api/useJettonWallet';
import { cn } from '@/shared/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Address } from '@ton/core';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { makeAskBid } from '../funcs/ask-bid';
import { useSeqno } from '../hooks/api/useSeqno';

type Action = 'buy' | 'sell';

type Addresses = {
  book_address: string;
  usdt_master_address: string;
  index_master_address: string;
};

type ActionTabProps = {
  action: Action;
  addresses: Addresses;
};

const OrderInputShema = z.object({
  amount: z.number().min(1, { message: 'Amount must be greater than 1' }),
});

type OrderInputShemaType = z.infer<typeof OrderInputShema>;

export const ActionTab: FC<ActionTabProps> = ({ action, addresses }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OrderInputShemaType>({
    resolver: zodResolver(OrderInputShema),
    defaultValues: {
      amount: 0,
    },
    mode: 'onChange',
  });

  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();
  const { data: jettons, isSuccess: isJettonsSuccess, isLoading: isJettonsLoading } = useJettonWallet({ address: address ?? '' });
  const { data: Seqno, isSuccess: isSeqnoSuccess } = useSeqno(addresses.book_address);

  const usdtUserJetton = jettons?.find((balance) => Address.parse(balance.jetton.address).toString() === addresses.usdt_master_address);
  const usdtUserJettonBalance = Number(usdtUserJetton?.balance) / 10 ** (usdtUserJetton?.jetton.decimals ?? 0);

  const indexUserJetton = jettons?.find((balance) => Address.parse(balance.jetton.address).toString() === addresses.index_master_address);
  const indexUserJettonBalance = Number(indexUserJetton?.balance) / 10 ** (indexUserJetton?.jetton.decimals ?? 0);

  const currentBalance = action === 'buy' ? usdtUserJettonBalance : indexUserJettonBalance;

  const onSubmit = async (data: OrderInputShemaType) => {
    if (action === 'buy') {
      if (!usdtUserJetton) throw new Error('USDT jetton not found');
      const askMessage = await makeAskBid(
        {
          seqno: isSeqnoSuccess ? Seqno : 0,
          amount: data.amount,
          order_book_address: addresses.book_address,
          jetton_address: Address.parse(usdtUserJetton.wallet_address.address).toString(),
          decimal: usdtUserJetton.jetton.decimals,
        },
        'ask',
      );
      tonConnectUI.sendTransaction(askMessage);
    } else {
      if (!indexUserJetton) throw new Error('Index jetton not found');
      const bidMessage = await makeAskBid(
        {
          seqno: isSeqnoSuccess ? Seqno : 0,
          amount: data.amount,
          order_book_address: addresses.book_address,
          jetton_address: Address.parse(indexUserJetton.wallet_address.address).toString(),
          decimal: indexUserJetton.jetton.decimals,
        },
        'bid',
      );
      tonConnectUI.sendTransaction(bidMessage);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value === '') {
      setValue('amount', 0, { shouldValidate: true });
      return;
    }

    const numericValue = Number(value);
    if (!isNaN(numericValue) && numericValue > 0) {
      setValue('amount', numericValue, { shouldValidate: true });
    }
  };

  const amount = watch('amount');

  return (
    <TabsContent value={action} className='flex h-full min-h-[230px] w-full flex-col gap-3'>
      <div className='mt-3 text-xs font-medium text-gray-500'>BALANCE • {currentBalance.toFixed(2)}</div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-1.5'>
        <div className={cn('relative rounded-xl border-2 p-2.5', errors.amount ? 'border-red-500' : 'border-blue-500')}>
          <label className={cn('absolute -top-2 left-4 bg-white px-1 text-xs font-medium', errors.amount ? 'text-red-500' : 'text-blue-500')}>
            {action === 'buy' ? 'Your order' : 'Your sell'}
          </label>
          <input
            placeholder='Buy tokens'
            type='number'
            className='w-full border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none'
            {...register('amount', {
              onChange: handleInputChange,
              max: currentBalance,
              min: 1,
            })}
          />
        </div>
        <p className='h-4 text-xs text-red-500'>{errors.amount?.message}</p>

        <div className='flex flex-col gap-3'>
          <div className='w-full text-center text-sm font-medium text-purple-500'>Exchange Rate $0.6202</div>
          <div className='flex items-center justify-center gap-2 text-xs text-gray-500'>
            <span className='flex h-3 w-3 items-center justify-center rounded-full border border-gray-400 text-xs'>i</span>
            <span>Price will change in 2 h 49 m</span>
          </div>

          {isJettonsSuccess && (
            <button
              type='submit'
              className='h-8 w-full rounded-xl bg-blue-500 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-600'>
              {action === 'buy' ? 'Buy' : 'Sell'} for {amount || 4.24} USDT
            </button>
          )}
          {isJettonsLoading && <Skeleton className='h-8 w-full rounded-xl' />}
        </div>
      </form>
    </TabsContent>
  );
};
