"use client";

import { User, BookOpen, LogIn, LogOut, MonitorPlay } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";
import axios from "axios";

export default function NavBar() {
  const { isLogged, logout } = useAuth();

  const handleLogout = (e: React.SyntheticEvent) => {
    e.preventDefault();

    axios.post("/api/auth/logout").catch((e) => console.error(e));
    logout();
  };

  return (
    <nav className="mx-4 my-4 rounded-xl bg-neutral-200 dark:bg-neutral-900 shadow-lg">
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
            href="/video-courses"
            className="flex items-center gap-1 hover:text-hover-primary transition"
          >
            <MonitorPlay size={18} />
            <span>Video-lezioni</span>
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
