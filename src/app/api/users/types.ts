import { UserRole } from "../../utils/models";

export interface CreateUserData {
  username: string;
  password: string;
  password_confirmation: string;
  role: UserRole;
}