import { gateway } from '@/shared/lib/axios';
import { useQuery } from '@tanstack/react-query';

type TONWallet = {
  address: string;
  balance: number;
  last_activity: number;
  status: string;
  interfaces: string[];
  get_methods: string[];
};

const useTonBlanace = (address: string) =>
  useQuery({
    queryKey: ['ton-balance'],
    queryFn: async () => {
      const { data } = await gateway.instance.ton.get<TONWallet>(`/accounts/${address}`);
      return data;
    },
  });

export { useTonBlanace };
