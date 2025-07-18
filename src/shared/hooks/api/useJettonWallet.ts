import { gateway } from '@/shared/lib/axios';
import { fetchData } from '@/shared/utils/zod.utils';
import { useQuery } from '@tanstack/react-query';

type Address = {
  address: string;
  is_scam: boolean;
  is_wallet: boolean;
};

type Jetton = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  image: string;
  verification: string;
  score: number;
};

type TokenBalance = {
  balance: string;
  wallet_address: Address;
  jetton: Jetton;
};

const useJettonWallet = ({ address }: { address: string }) =>
  useQuery({
    queryKey: ['jetton-wallet', address],
    queryFn: async () => {
      const jettons = await fetchData<{ balances: TokenBalance[] }>({
        instance: gateway.instance.ton,
        url: `accounts/${address}/jettons`,
        method: 'GET',
      });

      return jettons.balances;
    },
    enabled: !!address,
  });

export { useJettonWallet };
export type { TokenBalance };
