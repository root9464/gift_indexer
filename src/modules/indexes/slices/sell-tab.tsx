import { Skeleton } from '@/components/ui/skeleton';
import { TabsContent } from '@/components/ui/tabs';
import { useJettonWallet } from '@/shared/hooks/api/useJettonWallet';
import { cn } from '@/shared/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Address } from '@ton/core';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { makeBid } from '../funcs/bid';
import { formatToExponential } from '../utils/utils';
import type { FC } from 'react';
import { useOrderBookPair } from '../hooks/api/useOrderBookPair';

const OrderInputShema = z.object({
  amount: z.number().min(10, { message: 'Amount must be greater than 10' }),
});

type OrderInputShemaType = z.infer<typeof OrderInputShema>;

type SellTabProps = {
  order_book_address: string;
}

export const SellTab: FC<SellTabProps> = ({order_book_address}) => {

   const { data: OrderBookInfo } = useOrderBookPair(order_book_address);

   const orderBookAddress = OrderBookInfo && OrderBookInfo?.stack.length > 0 ? OrderBookInfo.stack[3].cell : ''

  const {
    register,
    handleSubmit,
    watch,
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

  const soxoJetton = jettons?.find((balance) => balance.jetton.address === Address.parse(orderBookAddress).toString());
  const soxoBalance = Number(soxoJetton?.balance) * 10 ** (soxoJetton?.jetton.decimals ?? 0);
  const soxJettonAddress = soxoJetton ? Address.parse(soxoJetton.wallet_address.address).toString() : null;

  const onSubmit = (data: OrderInputShemaType) => {
    if (!soxJettonAddress || !address) return;
    const bidMessage = makeBid(data.amount, soxJettonAddress);
    tonConnectUI.sendTransaction(bidMessage);
  };

  const amount = watch('amount');

  return (
    <TabsContent value='sell' className='flex h-full min-h-[230px] w-full flex-col gap-3'>
      <div className='mt-3 text-xs font-medium text-gray-500'>BALANCE •{formatToExponential(soxoBalance)} SOXO</div>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-1.5'>
        <div className={cn('relative rounded-xl border-2 p-2.5', errors.amount ? 'border-red-500' : 'border-blue-500')}>
          <label className={cn('absolute -top-2 left-4 bg-white px-1 text-xs font-medium', errors.amount ? 'text-red-500' : 'text-blue-500')}>
            Your order
          </label>
          <input
            placeholder='Sell tokens'
            type='number'
            className='w-full border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none'
            {...register('amount', { valueAsNumber: true })}
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
              disabled={isJettonsLoading}
              className='h-8 w-full rounded-xl bg-blue-500 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-600'>
              Sell for {amount || 4.24} SOXO
            </button>
          )}
          {isJettonsLoading && <Skeleton className='h-8 w-full rounded-xl' />}
        </div>
      </form>
    </TabsContent>
  );
};
