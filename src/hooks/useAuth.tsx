import React, { createContext, useContext, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginApi } from "../api/authApi";

export interface User {
  id: string;
  username: string;
  role: "ROLE_ADMIN" | "ROLE_MEMBER";
}

interface AuthContextType {
  user?: User;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);
  // Load user from storage
  React.useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("session");
      if (saved) setUser(JSON.parse(saved));
      setLoading(false);
    })();
  }, []);

  
  const signIn = useCallback(async (username: string, password: string) => {
    try {
        const result = await loginApi({ username, password });

        setUser(result as User);
        await AsyncStorage.setItem("session", JSON.stringify(result));
    } catch (err: any) {
        throw new Error(err.message);
    }
  }, []);


  const signOut = useCallback(async () => {
    setUser(undefined);
    await AsyncStorage.removeItem("session");
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
