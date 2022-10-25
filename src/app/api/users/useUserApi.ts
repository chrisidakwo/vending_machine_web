import { AuthClient, Client } from "../Client";
import { CreateUserData } from "./types";

export interface UseUserApiReturn {
  createAccount: (data: CreateUserData) => Promise<unknown>;
  getAuthUser: () => Promise<unknown>;
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

  const getAuthUser = (): Promise<unknown> => {
    const auth = JSON.parse(localStorage.getItem('auth') as string);
    const authClient = new AuthClient(auth.accessToken);

    return authClient.request({
      method: 'get',
      url: '/users/auth'
    });
  };

  return { createAccount, getAuthUser };
};
