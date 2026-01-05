import { act, renderHook, waitFor } from "@testing-library/react-native";
import { AuthProvider, useAuth } from "../useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authApi from "../../api/authApi";


jest.mock("../../api/authApi");
jest.mock(
  "@react-native-async-storage/async-storage",
  () => require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

describe("useAuth hook", () => {
     beforeEach(() => {
    jest.clearAllMocks();
  });

  it("provides auth context values", async () => {

     const mockUser = { id: "1", name: "Admin" };

      jest
      .spyOn(AsyncStorage, "getItem")
      .mockResolvedValueOnce(JSON.stringify(mockUser));

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>,
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current).toHaveProperty("signIn");
    expect(result.current).toHaveProperty("user");
  });
    test("signIn stores user and session on success", async () => {
    const mockUser = { id: "1", username: "admin" };

    jest.spyOn(authApi, "loginApi").mockResolvedValueOnce(mockUser as any);

    const { result } = renderHook(() => useAuth(), {
        wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>,
    });

    await act(async () => {
        await result.current.signIn("admin", "1234");
    });

    await waitFor(() => {
        expect(result.current.user).toEqual(mockUser);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "session",
        JSON.stringify(mockUser)
    );
    });

    test("signIn throws error when loginApi fails", async () => {
  jest
    .spyOn(authApi, "loginApi")
    .mockRejectedValueOnce(new Error("Invalid credentials"));

  const { result } = renderHook(() => useAuth(), {
    wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>,
  });

  await expect(
    act(async () => {
      await result.current.signIn("admin", "wrong");
    })
  ).rejects.toThrow("Invalid credentials");
});

it("clears user and removes session from AsyncStorage", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>,
    });

    await act(async () => {
      await result.current.signOut();
    });

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith("session");
  });

   it("throws error when used outside AuthProvider", () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow("useAuth must be used inside AuthProvide");
  });

it("provides auth context values for async storage undefined", async () => {

     const mockUser=false;

      jest
      .spyOn(AsyncStorage, "getItem")
      .mockResolvedValueOnce(JSON.stringify(mockUser));

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>,
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current).toHaveProperty("signIn");
    expect(result.current).toHaveProperty("user");
  });

});
