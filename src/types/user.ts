export type UserRole = "admin" | "user"

export interface User {
  id: string;
  username: string;
  password?: string;
  role: UserRole;
}