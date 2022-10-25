export interface User {
  id: string;
  username: string;
  deposit: number;
  role: UserRole;
}

export type UserRole = 'buyer' | 'seller'