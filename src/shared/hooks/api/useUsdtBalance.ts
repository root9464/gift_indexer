import { gateway } from '@/shared/lib/axios';
import { fetchData } from '@/shared/utils/zod.utils';
import { useQueries } from '@tanstack/react-query';
import { Address } from '@ton/core';
import type { TokenBalance } from './useJettonWallet';
import type { TokenPrices } from './useUsdt';

const useUsdtBalance = (address: string) => {
  const [jettonsQuery, usdtQuery] = useQueries({
    queries: [
      {
        queryKey: ['jetton-wallet', address],
        queryFn: () =>
          fetchData<{ balances: TokenBalance[] }>({
            instance: gateway.instance.ton,
            url: `accounts/${address}/jettons`,
            method: 'GET',
          }).then((r) => r.balances),
        enabled: !!address,
      },
      {
        queryKey: ['usdt', address],
        queryFn: async () => {
          const { balances } = await fetchData<{ balances: TokenBalance[] }>({
            instance: gateway.instance.ton,
            url: `accounts/${address}/jettons`,
            method: 'GET',
          });
          return fetchData<TokenPrices>({
            method: 'POST',
            url: '/token/price',
            instance: gateway.instance.backendSwapCoffee,
            body: {
              blockchain: 'ton',
              addresses: ['native', ...balances.map((j) => Address.parse(j.jetton.address).toString())],
            },
          });
        },
        enabled: !!address,
      },
    ],
  });

  const totalBalance =
    jettonsQuery.data && usdtQuery.data
      ? jettonsQuery.data.reduce((total, jetton) => {
          const jettonAddress = Address.parse(jetton.jetton.address).toString();
          const price = usdtQuery.data.find((p) => p.address === jettonAddress)?.usd_price || 0;
          return total + (Number(jetton.balance) / 10 ** jetton.jetton.decimals) * price;
        }, 0)
      : 0;

  return {
    totalBalance,
    isLoading: jettonsQuery.isLoading || usdtQuery.isLoading,
  };
};

export { useUsdtBalance };
