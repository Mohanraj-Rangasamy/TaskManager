import { User } from "../types/user";


export const createUserMock = (overrides: Partial<User> = {}): User => ({
  id: "1",
  username: "default_user",
  password: "password123",
  role: "user",
  ...overrides, 
});