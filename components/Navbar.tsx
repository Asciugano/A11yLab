"use client";

import { User, BookOpen, LogIn, LogOut, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function NavBar() {
  const { isLogged, logout } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.post("/api/auth/logout").catch((e) => console.error(e));
      logout();
      toast.success("A presto");
    } catch (e) {
      console.error(e);

      const err = e as AxiosError<{ message?: string }>;
      let message = "Ops... Qualcosa e' andato storto";

      if (err.response?.data.message) message = err.response.data.message;
      else if (typeof err.response?.data === "string")
        message = err.response.data;

      setError(message);

      toast.error(message);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mx-4 my-4 rounded-xl bg-neutral-200/40 dark:bg-neutral-900/40 backdrop-blur-md shadow-lg">
      <div className="flex items-center justify-between px-6 py-3">
        {/* SINISTRA: Logo */}
        <div>
          <Link
            href="/"
            className="text-xl font-bold tracking-wide text-primary hover:text-hover-primary transition"
          >
            A11yLab
          </Link>
        </div>

        {/* DESTRA: Links + Login/Logout */}
        <div className="flex items-center space-x-6">
          {/* Links */}
          <Link
            href="/profile"
            className="flex items-center gap-1 hover:text-hover-primary transition"
          >
            <User size={18} />
            <span>Profilo</span>
          </Link>

          <Link
            href="/courses"
            className="flex items-center gap-1 hover:text-hover-primary transition"
          >
            <BookOpen size={18} />
            <span>Corsi</span>
          </Link>

          <Link
            href="/my-courses"
            className="flex items-center gap-1 hover:text-hover-primary transition"
          >
            <GraduationCap size={18} />
            <span>My Courses</span>
          </Link>

          {/* Login o Logout */}
          {!isLogged ? (
            <Link
              href="/auth/login"
              className="flex items-center gap-1 px-4 py-2 text-white rounded-lg bg-accent hover:bg-hover-accent transition"
            >
              <LogIn size={18} />
              <span>Login</span>
            </Link>
          ) : (
            <form onSubmit={handleLogout}>
              <button
                type="submit"
                className="flex items-center gap-1 px-4 py-2 text-white rounded-lg bg-red-600 hover:bg-red-500 transition"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}
