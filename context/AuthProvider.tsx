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

type AuthContextType = {
  user: User | null;
  isLogged: boolean;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
  initialUser?: User | null;
}

export default function AuthProvider({ children, initialUser = null }: Props) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState(true);

  const login = (user: User) => setUser(user);
  const logout = () => setUser(null);

  useEffect(() => {
    if (!initialUser) {
      axios
        .get("/api/auth/me", { withCredentials: true })
        .then((res) => setUser(res.data))
        .catch((e) => setUser(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [initialUser]);

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
