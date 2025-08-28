import type { Action } from '@/shared/types/indexes';
import { Address, beginCell, toNano } from '@ton/core';
import { mnemonicToPrivateKey, sign } from '@ton/crypto';
import { CHAIN, type SendTransactionRequest } from '@tonconnect/ui-react';

type cancelAskBidParams = {
  seqno: number;
  user_address: string;
  order_book_address: string;
};

const cancelAskBid = async ({ seqno, user_address, order_book_address }: cancelAskBidParams, action: Action) => {
  const MNEMONICS = (import.meta.env.VITE_PUBLIC_ORDER_BOOK_ADMIN_MNEMONIC as string).split(' ');
  const keyPair = await mnemonicToPrivateKey(MNEMONICS);
  const orderBookType = action === 'ask' ? 2 : 1;

  const payload = beginCell()
    .storeUint(seqno, 32)
    .storeUint(1, 16)
    .storeUint(orderBookType, 4)
    .storeAddress(Address.parse(user_address))
    .endCell();

  const signature = sign(payload.hash(), keyPair.secretKey);

  const msg_body = beginCell()
    .storeUint(0x3567, 32)
    .storeUint(BigInt(Math.floor(Date.now() / 1000)), 64)
    .storeRef(payload)
    .storeBuffer(signature)
    .endCell();

  const message: SendTransactionRequest = {
    validUntil: Math.round(Date.now() / 1000) + 60 * 5,
    network: CHAIN.MAINNET,
    messages: [
      {
        address: order_book_address,
        amount: toNano('0.15').toString(),
        payload: msg_body.toBoc().toString('base64'),
      },
    ],
  };

  return message;
};

export { cancelAskBid };
