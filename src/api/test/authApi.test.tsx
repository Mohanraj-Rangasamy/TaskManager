import { loginApi } from "../authApi";


jest.mock("../mockUsers.json", () => ([
    { id: "1", username: "admin", password: "1234", role: "admin" },
    { id: "2", username: "user", password: "abcd", role: "user" },
  ]));

describe("loginApi", () => {
  beforeAll(() => {
    jest.useFakeTimers("modern");
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should return success for valid credentials", async () => {
   
    const promise = loginApi({
      username: "admin",
      password: "1234", 
    });

    jest.advanceTimersByTime(900);

    await Promise.resolve();

    const result = await promise;

    expect(result).toEqual({
      id: "1",
      username: "admin",
      role: "admin",
    });
  });
  it("should reject for invalid credentials", async () => {
  const promise = loginApi({
    username: "error",
    password: "wrong",
  });

  jest.advanceTimersByTime(900);
  await Promise.resolve();

  await expect(promise).rejects.toEqual({
    message: "Invalid username or password",
    status: 401,
  });
});
it("should reject with backend error when username is error", async () => {
  const promise = loginApi({
    username: "error",
    password: "anything",
  });

  jest.advanceTimersByTime(900);
  await Promise.resolve();

  await expect(promise).rejects.toEqual({
    message: "Invalid username or password",
    status: 401,
  });
});

});
