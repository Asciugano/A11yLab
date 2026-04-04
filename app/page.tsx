"use client";
import { useAuth } from "@/context/AuthProvider";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading)
    return <Loader2 size={20} className="text-primary animate-spin" />;

  return <div>Home + {!user ? "Anonimo" : user.fullName}</div>;
}
