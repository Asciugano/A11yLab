"use client";

import { User } from "@/lib/generated/prisma/client";
import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextType = {
  user: User | null;
  isLogged: boolean;
  login: (user: User) => void;
  logout: () => void;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => setUser(user);
  const logout = async () => setUser(null);

  useEffect(() => {
    axios
      .get("/api/auth/me")
      .then((res) => res.data)
      .then(setUser)
      .catch((e) => {
        setUser(null);
        console.error("error in AuthProvider", e);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("use Auth deve essere usato dentro a AuthProvider");

  return ctx;
}
