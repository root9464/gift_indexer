import { gateway } from '@/shared/lib/axios';
import { fetchData } from '@/shared/utils/zod.utils';
import { useQuery } from '@tanstack/react-query';

type WalletInfo = {
  address: string;
  balance: number;
  last_activity: number;
  status: string;
  interfaces: string[];
  get_methods: string[];
  is_wallet: boolean;
};

const useWalletInfo = (address: string) =>
  useQuery({
    queryKey: ['wallet-info', address],
    queryFn: async () => {
      const res = await fetchData<WalletInfo>({
        instance: gateway.instance.ton,
        url: `/accounts/${address}`,
        method: 'GET',
      });

      return res;
    },
    enabled: !!address,
  });

export { useWalletInfo };
