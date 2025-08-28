import { Address, Cell, Dictionary, type DictionaryValue } from '@ton/core';

export type orderInfoType = {
  orderAmount: bigint;
  addr: Address;
};

export const orderDictionaryValue: DictionaryValue<orderInfoType> = {
  serialize(src, builder) {
    builder.storeCoins(src.orderAmount);
    builder.storeAddress(src.addr);
  },

  parse(src) {
    return {
      orderAmount: src.loadCoins(),
      addr: src.loadAddress(),
    };
  },
};

export type asksBidsInfoType = {
  asks: Dictionary<bigint, orderInfoType>;
  bids: Dictionary<bigint, orderInfoType>;
};

export const asksBidsDictionaryValue: DictionaryValue<asksBidsInfoType> = {
  serialize(src, builder) {
    builder.storeDict(src.asks);
    builder.storeDict(src.bids);
  },

  parse(src) {
    return {
      asks: src.loadDict(Dictionary.Keys.BigUint(64), orderDictionaryValue),
      bids: src.loadDict(Dictionary.Keys.BigUint(64), orderDictionaryValue),
    };
  },
};

const normalizeAddresses = (orders: orderInfoType[]) =>
  orders.map((order) => ({
    orderAmount: order.orderAmount,
    addr: Address.parse(order.addr.toString()).toString(),
  }));

type ParsedOrders = {
  asks: Array<{ orderAmount: bigint; addr: string }>;
  bids: Array<{ orderAmount: bigint; addr: string }>;
};

const emptyParsedOrders: ParsedOrders = {
  asks: [],
  bids: [],
};

const parseOrderActionDict = (cell: Cell) => {
  try {
    if (!cell || cell.bits.length === 0) {
      return null;
    }
    const dict = Dictionary.loadDirect(Dictionary.Keys.Uint(16), asksBidsDictionaryValue, cell).get(1);
    if (!dict) return emptyParsedOrders;

    const parsedOrders: ParsedOrders = {
      asks: {
        ...normalizeAddresses(dict.asks.values()),
      },
      bids: {
        ...normalizeAddresses(dict.bids.values()),
      },
    };

    return parsedOrders;
  } catch (error) {
    console.error('Failed to parse order action dictionary:', error);
    return null;
  }
};

const findOrderByAddress = (parsed: ParsedOrders, address: string): 'ask' | 'bid' => {
  const bids = Array.isArray(parsed.bids) ? parsed.bids : [];

  const isBid = bids.find((order) => order.addr === address);
  if (isBid) return 'bid';

  return 'ask';
};

export { emptyParsedOrders, findOrderByAddress, parseOrderActionDict };
