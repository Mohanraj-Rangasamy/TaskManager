import users from "./mockUsers.json";

export interface LoginPayload {
  username: string;
  password: string;
}

export function loginApi({ username, password }: LoginPayload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
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

