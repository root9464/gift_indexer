import { env } from '@/shared/envs/env';
import { Address, beginCell, toNano } from '@ton/core';
import { CHAIN } from '@tonconnect/ui-react';

const makeBid = (amount: number, jetton_address: string) => {
  const payload = beginCell().storeUint(0xbf4385, 32).storeUint(1, 16).endCell();
  const msg_cell = beginCell()
    .storeUint(0xf8a7ea5, 32)
    .storeUint(BigInt(Math.floor(Date.now() / 1000)), 64)
    .storeCoins(amount * Math.pow(10, 9))
    .storeAddress(Address.parse(env.VITE_PUBLIC_ORDER_BOOK_ADDRESS))
    .storeUint(0, 2)
    .storeUint(0, 1)
    .storeCoins(toNano('0.1'))
    .storeBit(1)
    .storeRef(payload)
    .endCell();

  const message = {
    validUntil: Math.round(Date.now() / 1000) + 60 * 5,
    network: CHAIN.TESTNET,
    messages: [
      {
        address: jetton_address,
        amount: toNano('0.15').toString(),
        payload: msg_cell.toBoc().toString('base64'),
      },
    ],
  };

  return message;
};

export { makeBid };
