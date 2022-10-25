import { LoginData } from "../../auth";
import { AuthClient, Client } from "../Client";

export interface UseAuthApiReturnProps {
  login: (data: LoginData) => Promise<unknown>;
  logout: () => Promise<unknown>;
}

export const useAuthApi = (): UseAuthApiReturnProps => {
  const login = (data: LoginData): Promise<unknown> => {
    const client = new Client();

    return client.request({
      method: 'post',
      url: '/auth/login',
      data,
    });
  };

  const logout = (): Promise<unknown> => {
    const auth = JSON.parse(localStorage.getItem('auth') as string);

    const client = new AuthClient(auth.accessToken);
    return client.request({
      method: 'post',
      url: '/auth/logout'
    });
  };

  return { login, logout  };
}