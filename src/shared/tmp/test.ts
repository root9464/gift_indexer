// import { filterTxHistoryByRecipients } from '@/modules/order-transactions/helpers/filter-tx';
// import type { ResponseGetTrHistory } from '@/modules/order-transactions/hooks/api/useTransactions';
// import tx_json from './j.json';

// const raw_tx_json = tx_json as ResponseGetTrHistory;
// const txs = filterTxHistoryByRecipients(raw_tx_json, ['EQA11HrIxPAXeEykj4i2rSCIKN0YVw-gqP0I70S8FoIKGO9U']);

// console.log(txs, '');

const hexString = '0x4';
const numberFromHex = parseInt(hexString, 16); // 4

console.log(numberFromHex); // 4
