import { loginApi } from "../authApi";
import { createUserMock } from "../../__mocks__/factories";

describe("loginApi", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should return success for valid credentials using factory-generated data", async () => {
    
    const mockAdmin = createUserMock({ 
      id: "1", 
      username: "admin", 
      role: "admin" 
    });

    const { id, username, role } = mockAdmin;
    const expectedResponse = { id, username, role };

    const promise = loginApi({
      username: "admin",
      password: "admin123", 
    });

    jest.advanceTimersByTime(900);

    const result = await promise;

    expect(result).toEqual(expectedResponse);
  });

  it("should reject with 401 for invalid credentials", async () => {
    const promise = loginApi({
      username: "unknown_user",
      password: "wrong_password",
    });

    jest.advanceTimersByTime(900);

    await expect(promise).rejects.toEqual({
      message: "Invalid username or password",
      status: 401,
    });
  });

  it("should reject with 500 when the 'error' trigger is used", async () => {
    const promise = loginApi({
      username: "error",
      password: "any_password",
    });

    jest.advanceTimersByTime(900);

    await expect(promise).rejects.toEqual({
      message: "Backend failed. Try again later.",
      status: 500,
    });
  });
});