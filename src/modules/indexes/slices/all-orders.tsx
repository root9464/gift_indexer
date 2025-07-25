type Order = {
  total_amount: number;
};

export const AllOrdersHeader = ({ total_amount }: Order) => (
  <div className='flex items-center justify-between'>
    <div className='text-xs font-medium text-gray-700'>Order book • {total_amount} Sellers</div>
    {/* <div className='flex items-center gap-1 text-xs font-medium text-blue-500'>
      My orders<div className='h-1.5 w-1.5 rounded-full bg-blue-500'></div>
    </div> */}
  </div>
);

type OrderItemProps = {
  symbol: string;
  address: string;
  amount: number;
  price: number;
};

export const OrderItem = ({ symbol, address, amount, price }: OrderItemProps) => {
  const sliceAddress = address.slice(0, 10) + '...' + address.slice(-10);
  return (
    <div className='flex items-center justify-between border-b border-gray-100 py-3'>
      <div className='flex items-center gap-3'>
        <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500'>
          <div className='text-xs font-bold text-white'>{symbol}</div>
        </div>
        <div>
          <div className='text-sm font-medium text-gray-800'>{sliceAddress}</div>
          <div className='text-xs text-gray-500'>Sell • {amount} Tokens</div>
        </div>
      </div>
      <div className='text-right'>
        <div className='text-sm font-bold text-gray-800'>${price}</div>
        <div className='text-xs font-medium text-green-500'>USDT</div>
      </div>
    </div>
  );
};

export const AllOrders = () => {
  return (
    <div className='space-y-3'>
      <AllOrdersHeader total_amount={54} />
      <div className='space-y-0'>
        <OrderItem symbol='CAP' address='EQBzcE4-5qeADB5qeADB5qeADBkx' amount={243.06} price={804.2} />
      </div>
    </div>
  );
};
