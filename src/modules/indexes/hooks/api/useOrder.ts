import { useQuery } from "@tanstack/react-query"
import { gateway } from "@/shared/lib/axios"
import { generateIndexesMock } from "@shared/mocks/generatemock"
import { env } from "@/shared/envs/env"

type OrderIndexResponse = string[]

export type OrderBook = {
    order_book_address: string;
    icon: string;
    title: string;
    mcap: number;
    price: number;
    change_price: number;
    type: string;
}

export const useOrder = () => {
    return useQuery({
        queryKey: ['Orders'],
        queryFn: async () => {
            const { data } = await gateway.instance.orderServise.get<OrderIndexResponse>("/get_all_order_books",{
                headers: {
                    'Authorization': `Bearer ${env.VITE_PUBLIC_ALL_ORDER_BOOK_ADDRESS}`
                }
            })

            const INDEXES_MOCK = generateIndexesMock(data.length)
            return INDEXES_MOCK.map((mockItem, index) => (
                {
                    ...mockItem,
                order_book_address: data[index] || ''
                }
            ))
        }
    })
}