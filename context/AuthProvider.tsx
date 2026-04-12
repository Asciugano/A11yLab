"use client";

import { FullUser } from "@/types/user";
import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  user: FullUser | null;
  isLogged: boolean;
  loading: boolean;
  login: (user: FullUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<FullUser | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (user: FullUser) => {
    setUser(user);
  };
  const logout = () => setUser(null);

  useEffect(() => {
    axios
      .get("/api/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch((e) => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged: !!user,
        loading,
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
