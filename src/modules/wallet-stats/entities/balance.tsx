import { useJettonWallet } from '@/shared/hooks/api/useJettonWallet';
import { useUsdt } from '@/shared/hooks/api/useUsdt';
import { Address } from '@ton/core';
import { useTonAddress } from '@tonconnect/ui-react';

export const Balance = () => {
  const address = useTonAddress();
  const { data: jettonsWallet } = useJettonWallet({ address });
  const jettonsAddress = jettonsWallet?.map((jetton) => Address.parse(jetton.jetton.address).toString());
  const { data: usdt } = useUsdt(['native', ...(jettonsAddress ?? [])]);
  const totalBalance =
    jettonsWallet && usdt
      ? jettonsWallet.reduce((total, jetton) => {
          const jettonAddress = Address.parse(jetton.jetton.address).toString();
          const priceData = usdt.find((item) => item.address === jettonAddress);
          if (!priceData) return total;

          const balance = Number(jetton.balance) / 10 ** jetton.jetton.decimals;
          const usdValue = balance * priceData.usd_price;
          return total + usdValue;
        }, 0)
      : 0;

  return (
    <div className='flex items-center justify-center gap-2 text-sm font-bold text-gray-500'>
      <div className='text-4xl font-bold text-gray-800'>$ {totalBalance.toFixed(2) ?? 0}</div>
    </div>
  );
};
