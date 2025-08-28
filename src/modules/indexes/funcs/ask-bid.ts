import type { Action, BidAskParams } from '@/shared/types/indexes';
import { Address, beginCell, toNano } from '@ton/core';
import { mnemonicToPrivateKey, sign } from '@ton/crypto';
import { CHAIN, type SendTransactionRequest } from '@tonconnect/ui-react';

const makeAskBid = async ({ seqno, amount, order_book_address, jetton_address, decimal }: BidAskParams, action: Action) => {
  const MNEMONICS = (import.meta.env.VITE_PUBLIC_ORDER_BOOK_ADMIN_MNEMONIC as string).split(' ');
  const keyPair = await mnemonicToPrivateKey(MNEMONICS);
  const forwardPayloadOpCode = action === 'ask' ? 0x845746 : 0xbf4385;
  const forwardPayload = beginCell().storeUint(seqno, 32).storeUint(forwardPayloadOpCode, 32).storeUint(1n, 16).endCell();
  const signature = sign(forwardPayload.hash(), keyPair.secretKey);
  const msg_cell = beginCell()
    .storeUint(0xf8a7ea5, 32)
    .storeUint(BigInt(Math.floor(Date.now() / 1000)), 64)
    .storeCoins(amount * Math.pow(10, decimal))
    .storeAddress(Address.parse(order_book_address))
    .storeUint(0, 2)
    .storeUint(0, 1)
    .storeCoins(toNano('0.1'))
    .storeBit(1)
    .storeRef(beginCell().storeRef(forwardPayload).storeBuffer(signature).endCell())
    .endCell();

  const message: SendTransactionRequest = {
    validUntil: Math.round(Date.now() / 1000) + 60 * 5,
    network: CHAIN.MAINNET,
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

export { makeAskBid };
