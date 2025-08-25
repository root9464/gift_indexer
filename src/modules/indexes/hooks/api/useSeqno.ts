import { gateway } from '@/shared/lib/axios';
import type { SmartContractGetSeqnoMethod } from '@/shared/types/ton-api';
import { useQuery } from '@tanstack/react-query';

export const useSeqno = (order_book_address: string) =>
  useQuery({
    queryKey: ['seqno'],
    queryFn: async () => {
      const { data } = await gateway.instance.ton.get<SmartContractGetSeqnoMethod>(
        `/blockchain/accounts/${order_book_address}/methods/get_seqno`,
      );
      return Number(data.stack?.[0]?.num);
    },
  });
