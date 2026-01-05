import { User } from "../types/user";
import { createUserMock } from "../__mocks__/factories";

// Generate our "database" using the factory
const mockUsers: User[] = [
  createUserMock({ id: "1", username: "admin", password: "admin123", role: "admin" }),
  createUserMock({ id: "2", username: "user", password: "user123", role: "user" }),
];

export interface LoginPayload {
  username: string;
  password: string;
}

export function loginApi({ username, password }: LoginPayload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      
      const user = mockUsers.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        return reject({ message: "Invalid username or password", status: 401 });
      }

      if (username === "error") {
        return reject({ message: "Backend failed. Try again later.", status: 500 });
      }
      
      return resolve({
        id: user.id,
        username: user.username,
        role: user.role,
      });
    }, 900);
  });
}