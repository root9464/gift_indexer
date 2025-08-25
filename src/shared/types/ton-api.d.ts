import type { Extend } from './utils';

type CellStackItem = {
  type: 'cell';
  cell: string;
};

type NumStackItem = {
  type: 'num';
  num: string;
};

type BaseHeader = {
  success: boolean;
  exit_code: number;
};

export type SmartContractCellsMethodResponse = Extend<BaseHeader, { stack: CellStackItem[] }>;
export type SmartContractGetSeqnoMethod = Extend<BaseHeader, { stack: NumStackItem[] }>;
