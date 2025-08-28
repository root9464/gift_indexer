import { gateway } from '@/shared/lib/axios';
import type { SmartContractGetSeqnoMethod } from '@/shared/types/ton-api';
import { useQuery } from '@tanstack/react-query';

const useGetPrices = (order_book_address: string) =>
  useQuery({
    queryKey: ['prices', order_book_address],
    queryFn: async () => {
      const { data } = await gateway.instance.ton.get<SmartContractGetSeqnoMethod>(
        `/blockchain/accounts/${order_book_address}/methods/get_order_book_prices`,
      );

      return data;
    },
  });

export { useGetPrices };
