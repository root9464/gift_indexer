import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

type GatewayInstance = 'ton' | 'backendSwapCoffee';

class Gateway {
  private readonly configs: Record<GatewayInstance, AxiosRequestConfig>;

  constructor() {
    this.configs = {
      ton: { baseURL: 'https://testnet.tonapi.io/v2' },
      backendSwapCoffee: { baseURL: 'https://backend.swap.coffee/v1' },
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
