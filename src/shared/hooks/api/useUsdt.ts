import { gateway } from '@/shared/lib/axios';
import { fetchData } from '@/shared/utils/zod.utils';
import { useQuery } from '@tanstack/react-query';

type TokenPrice = {
  address: string;
  usd_price: number;
};

type TokenPrices = TokenPrice[];

export const useUsdt = (addresses: string[]) =>
  useQuery({
    queryKey: ['usdt', addresses],
    queryFn: () => {
      const response = fetchData<TokenPrices>({
        method: 'POST',
        url: '/token/price',
        instance: gateway.instance.backendSwapCoffee,
        body: {
          blockchain: 'ton',
          addresses: addresses,
        },
      });
      return response;
    },
    enabled: !!addresses && addresses.length > 0,
  });
