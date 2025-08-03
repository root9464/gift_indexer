import { gateway } from "@/shared/lib/axios"
import { useQuery } from "@tanstack/react-query"

type StackItem = {
  type: 'cell';
  cell: string;
}

type OrderBookPairResponse = {
  success: boolean;
  exit_code: number;
  stack: StackItem[];
}

export const useOrderBookPair = (order_book_address: string) => {
    return useQuery({
        queryKey: ['OrderBookPair'],
        queryFn: async () => {
            const { data } = await gateway.instance.ton.get<OrderBookPairResponse>(`/blockchain/accounts/${order_book_address}/methods/get_order_book_addresses`)

            return data
        },
        enabled: !!order_book_address
    })
}