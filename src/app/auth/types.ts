import { User } from "../utils/models";

export interface Auth {
  accessToken: string | null;
  user: User | null;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthActions {
  setAuthUser?: (user: User) => void;
  onLogin?: (data: LoginData) => Promise<unknown>;
  onLogout?: () => Promise<unknown>;
}
