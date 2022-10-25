import { User } from "../../utils/models";
import { AuthClient, Client } from "../Client";
import { CreateUserData } from "./types";

export interface UseUserApiReturn {
  createAccount: (data: CreateUserData) => Promise<unknown>;
  getAuthUser: () => Promise<User>;
  deposit: (amount: number) => Promise<User>;
  resetDeposit: () => Promise<User>;
}

export const useUserApi = (): UseUserApiReturn => {
  const createAccount = (data: CreateUserData): Promise<unknown> => {
    const client = new Client();

    return client.request({
      method: 'post',
      url: '/users',
      data,
    });
  };

  const getAuthUser = (): Promise<User> => {
    const auth = JSON.parse(localStorage.getItem('auth') as string);
    const authClient = new AuthClient(auth.accessToken);

    return authClient.request({
      method: 'get',
      url: '/users/auth'
    }).then((response) => {
      return Promise.resolve(response);
    }).catch((error) => {
      return error.response.data;
    }) as Promise<User>;
  };

  const deposit = (amount: number): Promise<User> => {
    const auth = JSON.parse(localStorage.getItem('auth') as string);
    const authClient = new AuthClient(auth.accessToken);

    return authClient.request({
      url: '/deposit',
      method: 'post',
      data: { amount }
    }).then((response) => {
      return Promise.resolve(response);
    }).catch((error) => {
      return error.response.data;
    }) as Promise<User>;
  }

  const resetDeposit = (): Promise<User> => {
    const auth = JSON.parse(localStorage.getItem('auth') as string);
    const authClient = new AuthClient(auth.accessToken);

    return authClient.request({
      url: '/reset',
      method: 'post',
    }).then((response) => {
      return Promise.resolve(response);
    }).catch((error) => {
      return error.response.data;
    }) as Promise<User>;
  }

  return { createAccount, getAuthUser, deposit, resetDeposit };
};
