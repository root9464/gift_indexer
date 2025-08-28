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

const cell = Cell.fromHex(
  'b5ee9c7201010a010059000202cc0102020120030402014807080201200507020120070701015a06005ea00000000000000005a23c346004006df1b201efed0005181a3fa286243892c1ee713a0a50d8e9e109629bf31c02430201200909000142000108',
);

const dict = Dictionary.loadDirect(Dictionary.Keys.Uint(16), asksBidsDictionaryValue, cell);
const orders: asksBidsInfoType | undefined = dict.get(1);

console.log('-----------[ ASKS ]-----------');
console.log(orders?.asks.keys());
console.log(orders?.asks.values());

console.log('-----------[ BIDS ]-----------');
console.log(orders?.bids.keys());
console.log(orders?.bids.values());
