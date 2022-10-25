import React, { createContext, FC, PropsWithChildren } from 'react';
import { useLocalStorage } from 'react-use';
import { useAuthApi, useUserApi } from '../api';
import { User } from '../utils/models';

import { Auth, AuthActions, LoginData } from './types';

export const AuthContext = createContext<Auth & AuthActions>({
  accessToken: null,
  user: null,
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const [auth, setAuth] = useLocalStorage<Auth>('auth', {
    accessToken: JSON.parse(localStorage.getItem('auth') as string).accessToken,
    user: JSON.parse(localStorage.getItem('auth.user') as string) as User | null,
  });

  const { login, logout } = useAuthApi();
  const { getAuthUser } = useUserApi();

  const handleLogin = (data: LoginData): Promise<unknown> => {
    return login(data)
      .then(async (response: any) => {
        const accessToken = response.accessToken;

        setAuth({
          accessToken,
          user: null,
        });

        const user = await getAuthUser();

        setAuth({
          accessToken,
          user: user as User,
        });

        return Promise.resolve({
          user,
          accessToken,
        });
      })
      .catch((error) => Promise.reject(error));
  };

  const handleLogout = (): Promise<unknown> => {
    console.log('logout');

    return logout().then(() => {
      setAuth({
        accessToken: null,
        user: null
      });
    });
  };

  return (
    <AuthContext.Provider value={{
      accessToken: auth?.accessToken ?? '',
      user: auth?.user ?? null,
      onLogin: handleLogin,
      onLogout: handleLogout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
