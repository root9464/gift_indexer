export type StackItem = {
  type: 'cell';
  cell: string;
};

export type SmartContractMethodResponse = {
  success: boolean;
  exit_code: number;
  stack: StackItem[];
};
