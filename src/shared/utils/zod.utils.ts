/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosInstance, AxiosResponse } from 'axios';
import axios, { type AxiosRequestConfig } from 'axios';
import { z } from 'zod/v4';
import type { Extend } from '../types/utils';

const validateResult = <T extends z.ZodType, R>(data: R, resType: T): z.infer<T> => {
  try {
    return resType.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorDetails = z.treeifyError(error);
      const formattedErrors = {
        message: 'Validation failed',
        object: data,
        errors: errorDetails,
        count: Object.keys(errorDetails).length,
      };
      console.error('Validation error:', JSON.stringify(formattedErrors, null, 2));
      throw new Error(JSON.stringify(formattedErrors));
    }
    console.error('Validation error:', (error as Error).toString());
    throw error;
  }
};

type FetchDataOptions<T> = Extend<
  AxiosRequestConfig,
  {
    schema?: z.ZodSchema<T>;
    body?: any;
    instance?: AxiosInstance;
  }
>;

const fetchData = async <T>({ method, url, body, schema, instance, ...config }: FetchDataOptions<T>): Promise<T> => {
  const requestMethod = instance?.request ? instance.request : axios.request;
  const { data, status, statusText }: AxiosResponse<T> = await requestMethod({ method, url, data: body, ...config });
  if (status < 200 || status >= 300) {
    throw new Error(statusText || `Request failed with status ${status}`);
  }
  return schema ? validateResult(data, schema) : data;
};

export { fetchData, validateResult };
export type { FetchDataOptions };
