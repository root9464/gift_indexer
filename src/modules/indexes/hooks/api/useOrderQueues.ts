import { gateway } from '@/shared/lib/axios';
import type { SmartContractCellsMethodResponse } from '@/shared/types/ton-api';
import { useQuery } from '@tanstack/react-query';

const useOrderQueues = (order_book_address: string) =>
  useQuery({
    queryKey: ['order_queues', order_book_address],
    queryFn: async () => {
      const { data } = await gateway.instance.ton.get<SmartContractCellsMethodResponse>(
        `/blockchain/accounts/${order_book_address}/methods/get_porder_queues`,
      );

      return data;
    },
  });

export { useOrderQueues };
