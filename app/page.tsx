"use client";
import Dashboard from "@/components/Dashboard";
import Landing from "@/components/Landing";
import { useAuth } from "@/context/AuthProvider";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Loader2 size={20} className="text-primary animate-spin" />
      </div>
    );

  if (!user) return <Landing />;

  return <Dashboard user={user} />;
}
