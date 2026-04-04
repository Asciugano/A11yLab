"use client";
import { useAuth } from "@/context/AuthProvider";

export default function Home() {
  const { user } = useAuth();
  return <div>Home + {!user ? "Anonimo" : user.fullName}</div>;
}
