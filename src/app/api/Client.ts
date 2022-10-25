/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import merge from 'lodash/fp/merge';
import { axios } from './axios';

export interface ClientInterface {
  request(
    config: AxiosRequestConfig,
  ): Promise<unknown>;
}

export class Client implements ClientInterface {
  private readonly config: AxiosRequestConfig;

  /**
   * Constructor.
   */
  public constructor() {
    this.config = {
      // @ts-ignore
      baseURL: import.meta.env.VITE_API_BASE_URL,
      // @ts-ignore
      timeout: import.meta.env.VITE_BROWSER_API_TIMEOUT ?? 60000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },

      withCredentials: true,
    };
  }

  /**
   * Client request.
   * 
   * @param config 
   * @returns 
   */
  public async request(config: AxiosRequestConfig): Promise<unknown> {
    const response = await this.makeRequest(config);

    if (typeof response.data !== 'object') {
      console.log(`JSON API Data must be Object, ${typeof response.data} given instead`, {
        response,
      });
    }

    return response.data;
  }

  /**
   * Make API request.
   * 
   * @param config 
   * @returns 
   */
  protected async makeRequest(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return await axios.request(merge(this.config, config));
  }
}


export class AuthClient extends Client {
  protected readonly accessToken: string;

  /**
   * Constructor.
   */
   public constructor(accesssToken: string) {
      super();
      this.accessToken = accesssToken;
   }

  public async request(config: AxiosRequestConfig): Promise<unknown> {
    const response = await this.makeRequest(
      merge(config, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      })
    );

    if (typeof response.data !== 'object') {
      console.log(`JSON API Data must be Object, ${typeof response.data} given instead`, {
        response,
      });
    }

    return response.data;
  }
}
