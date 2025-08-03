/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod/v4';
import { validateResult } from '../utils/zod.utils';

const ENVs = z.object({
  VITE_PUBLIC_ADMIN_ADDRESS: z.string(),
  VITE_PUBLIC_SOXO_MASTER_ADDRESS: z.string(),
  VITE_PUBLIC_USDT_MASTER_ADDRESS: z.string(),
  VITE_PUBLIC_ORDER_BOOK_ADDRESS: z.string(),
  VITE_PUBLIC_BOOK_MINTER_ADDRESS: z.string(),
  VITE_PUBLIC_ALL_ORDER_BOOK_ADDRESS: z.string(),
});

type EnvSchema = z.infer<typeof ENVs>;

const validateEnvs = (envs: Record<string, any>): EnvSchema => validateResult(envs, ENVs);

export const env = validateEnvs(import.meta.env);
