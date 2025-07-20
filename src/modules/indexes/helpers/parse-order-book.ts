import { Address, beginCell, Dictionary, type DictionaryValue } from '@ton/core';

type orderInfoType = {
  orderAmount: bigint;
  stdAddr: bigint;
};

const orderDictionaryValue: DictionaryValue<orderInfoType> = {
  serialize(src, builder) {
    builder.storeCoins(src.orderAmount);
    builder.storeUint(src.stdAddr, 256);
  },

  parse(src) {
    return {
      orderAmount: src.loadCoins(),
      stdAddr: BigInt(src.loadUintBig(256)),
    };
  },
};

type asksBidsInfoType = {
  asks: Dictionary<bigint, orderInfoType>;
  bids: Dictionary<bigint, orderInfoType>;
};

const asksBidsDictionaryValue: DictionaryValue<asksBidsInfoType> = {
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

function getAddress(addressUint: bigint): Address {
  return beginCell().storeUint(2, 2).storeUint(0, 1).storeUint(0, 8).storeUint(addressUint, 256).endCell().beginParse().loadAddress();
}

export { asksBidsDictionaryValue, getAddress, orderDictionaryValue };
export type { asksBidsInfoType, orderInfoType };
