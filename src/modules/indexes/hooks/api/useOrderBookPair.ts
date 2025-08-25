import { gateway } from '@/shared/lib/axios';
import type { SmartContractMethodResponse } from '@/shared/types/ton-api';
import { useQuery } from '@tanstack/react-query';
import { Cell } from '@ton/core';
import { loadAddressFromCell } from '../../helpers/parse-order-book';

export type OrderBookAddresses = {
  owner_address: string;
  admin_address: string;
  book_minter_address: string;
  usdt_master_address: string;
  index_master_address: string;
};

export const useOrderBookPair = (order_book_address: string) =>
  useQuery({
    queryKey: ['OrderBookPair'],
    queryFn: async () => {
      const { data } = await gateway.instance.ton.get<SmartContractMethodResponse>(
        `/blockchain/accounts/${order_book_address}/methods/get_order_book_addresses`,
      );

      const safe = (i: number) =>
        data.stack[i]?.type === 'cell' && data.stack[i]?.cell ? loadAddressFromCell(Cell.fromHex(data.stack[i].cell)).toString() : null;

      return {
        owner_address: safe(0),
        admin_address: safe(1),
        book_minter_address: safe(2),
        usdt_master_address: safe(3),
        index_master_address: safe(4),
      };
    },
  });
