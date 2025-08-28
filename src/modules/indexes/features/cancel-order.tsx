import { Cell } from '@ton/core';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import type { FC } from 'react';
import { cancelAskBid } from '../funcs/cancel-ask-bid';
import { emptyParsedOrders, findOrderByAddress, parseOrderActionDict } from '../helpers/parse-ask-bid-dict';
import { useOrderQueues } from '../hooks/api/useOrderQueues';
import { useSeqno } from '../hooks/api/useSeqno';

type CancelOrderProps = {
  order_book_address: string;
};

export const CancelOrder: FC<CancelOrderProps> = ({ order_book_address }) => {
  const address = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const { data: Seqno, isSuccess: isSeqnoSuccess } = useSeqno(order_book_address);
  const { data: OrderQueues, isSuccess: isOrderQueuesSuccess } = useOrderQueues(order_book_address);
  const orderQueueCell = isOrderQueuesSuccess && OrderQueues ? Cell.fromHex(OrderQueues.stack[0].cell) : Cell.EMPTY;
  const orderParsedDict = parseOrderActionDict(orderQueueCell) ?? emptyParsedOrders;
  console.log(orderParsedDict, 'orderParsedDict');

  const orderType = findOrderByAddress(orderParsedDict, address);
  console.log(orderType);

  const handleCancelOrder = async () => {
    if (!isSeqnoSuccess) return;
    const message = await cancelAskBid(
      {
        seqno: Seqno,
        order_book_address: order_book_address,
        user_address: address,
      },
      orderType,
    );

    await tonConnectUI.sendTransaction(message);
  };

  return (
    <button
      type='submit'
      className='h-[50px] w-full rounded-xl bg-blue-500 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-600'
      onClick={handleCancelOrder}>
      Cancel Order ({orderType})
    </button>
  );
};
