"use client";

import EnumDropdown from "@/components/Dropdown";
import { useAuth } from "@/context/AuthProvider";
import { Course } from "@/lib/generated/prisma/client";
import { LessonType, UserRole } from "@/lib/generated/prisma/enums";
import axios, { AxiosError } from "axios";
import {
  NotebookPen,
  BookOpen,
  CreditCard,
  FileText,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  course: Course;
}

export default function CreateLessonPage({ course }: Props) {
  const router = useRouter();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    resUrl: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: implementare
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
    <div className="flex justify-center items-center">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Crea una Lezione
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* title */}
          <div className="flex items-center gap-3 border-neutral-400 dark:border-neutral-600 rounded-lg px-3 py-2 bg-white dark:bg-neutral-900 focus-within:ring-primary">
            <BookOpen
              size={20}
              className="text-neutral-500 dark:text-neutral-400"
            />
            <input
              type="text"
              placeholder="Titolo"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full bg-transparent outline-none text-neutral-800 dark:text-neutral-100 placeholder-neutral-500"
              required
            />
          </div>

          {/* description */}
          <div className="flex items-center gap-3 border-neutral-400 dark:border-neutral-600 rounded-lg px-3 py-2 bg-white dark:bg-neutral-900 focus-within:ring-primary">
            <FileText
              size={20}
              className="text-neutral-500 dark:text-neutral-400"
            />
            <input
              type="text"
              placeholder="Descrizione"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-transparent outline-none text-neutral-800 dark:text-neutral-100 placeholder-neutral-500"
              required
            />
          </div>

          {/* role */}
          <EnumDropdown
            value={formData.type}
            onChange={(role) => setFormData({ ...formData, type: role })}
            options={Object.values(LessonType)}
            icon={
              <CreditCard
                size={20}
                className="text-neutral-500 dark:text-neutral-400"
              />
            }
          />

          {/* certificate */}
          <div className="flex items-center gap-3 border-neutral-400 dark:border-neutral-600 rounded-lg px-3 py-2 bg-white dark:bg-neutral-900 focus-within:ring-primary">
            <NotebookPen
              size={20}
              className="text-neutral-500 dark:text-neutral-400"
            />
            <input
              type="file"
              accept="application/pdf,video/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file)
                  setFormData({ ...formData, resUrl: file.webkitRelativePath });
              }}
              className="w-full bg-transparent outline-none text-neutral-500 placeholder-neutral-500"
              required
            />
          </div>

          {error && error.length > 0 && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full flex items-center justify-center bg-primary hover:bg-hover-primary text-white font-semibold rounded-lg px-4 py-2 transition disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : "Crea"}
          </button>
        </form>
      </div>
    </div>
  );
}
