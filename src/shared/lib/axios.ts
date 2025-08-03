import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

type GatewayInstance = 'ton' | 'backendSwapCoffee' | 'orderServise';

class Gateway {
  private readonly configs: Record<GatewayInstance, AxiosRequestConfig>;

  constructor() {
    this.configs = {
      ton: { baseURL: 'https://tonapi.io/v2' },
      backendSwapCoffee: { baseURL: 'https://backend.swap.coffee/v1' },
      orderServise: { baseURL: 'http://147.45.137.121:8081'}
    };
  }

  get instance(): Record<GatewayInstance, AxiosInstance> {
    return Object.fromEntries(Object.entries(this.configs).map(([key, config]) => [key, axios.create(config)])) as Record<
      GatewayInstance,
      AxiosInstance
    >;
  }
}

const gateway = new Gateway();

export { gateway };
