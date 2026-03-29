"use client";

import axios, { AxiosError } from "axios";
import { User, Mail, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [showPass, setShowPass] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await axios.post("/api/register", formData);
    } catch (e) {
      console.error(e);

      const err = e as AxiosError<{ message?: string }>;

      if (err.response?.data.message) setError(err.response.data.message);
      else if (typeof err.response?.data === "string")
        setError(err.response.data);
      else setError("Ops... Qualcosa e' andato storto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full bg-neutral-300 dark:bg-neutral-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Registrati</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* username */}
          <div className="flex items-center gap-3 border-neutral-400 dark:border-neutral-600 rounded-lg px-3 py-2 bg-white dark:bg-neutral-900 focus-within:ring-primary">
            <User
              size={20}
              className="text-neutral-500 dark:text-neutral-400"
            />
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full bg-transparent outline-none text-neutral-800 dark:text-neutral-100 placeholder-neutral-500"
              required
            />
          </div>

          {/* email */}
          <div className="flex items-center gap-3 border-neutral-400 dark:border-neutral-600 rounded-lg px-3 py-2 bg-white dark:bg-neutral-900 focus-within:ring-primary">
            <Mail
              size={20}
              className="text-neutral-500 dark:text-neutral-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-transparent outline-none text-neutral-800 dark:text-neutral-100 placeholder-neutral-500"
              required
            />
          </div>

          {/* password */}
          <div className="flex items-center gap-3 border-neutral-400 dark:border-neutral-600 rounded-lg px-3 py-2 bg-white dark:bg-neutral-900 focus-within:ring-primary">
            <Lock
              size={20}
              className="text-neutral-500 dark:text-neutral-400"
            />
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full bg-transparent outline-none text-neutral-800 dark:text-neutral-100 placeholder-neutral-500"
              required
            />
            <button onClick={() => setShowPass(!showPass)} type="button">
              {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          {error && error.length > 0 && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full flex items-center justify-center bg-primary hover:bg-hover-primary text-white font-semibold rounded-lg px-4 py-2 transition disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "Register"
            )}
          </button>
        </form>
        <p className="text-sm text-center mt-8">
          Hai un&apos;Account?{" "}
          <Link href="/auth/login" className="text-sm text-primary">
            Accedi
          </Link>
        </p>
      </div>
    </div>
  );
}
