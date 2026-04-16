"use client";

import { Lesson } from "@/lib/generated/prisma/client";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CompleteButton({
  lesson,
  nextLesson,
}: {
  lesson: Lesson;
  nextLesson?: Lesson;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleComplete = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await axios.post(`/api/lesson/${lesson.id}/complete`);
      toast.success(`Hai finito la lezione ${lesson.title}`);

      router.push(
        !nextLesson
          ? `/courses/${lesson.courseId}`
          : `/lessons/${nextLesson.id}`,
      );
    } catch (e) {
      console.error(e);

      const err = e as AxiosError<{ message?: string }>;
      let message = "Ops... Qualcosa e' andato storto";

      if (err.response?.data.message) message = err.response.data.message;
      else if (typeof err.response?.data === "string")
        message = err.response.data;

      setError(message);

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={handleComplete}
        disabled={loading}
        className="bg-accent text-white px-6 py-3 rounded-xl hover:bg-hover-accent transition"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : !nextLesson ? (
          "Completa la lezione"
        ) : (
          "Vai alla successiva"
        )}
      </button>
      {error && error?.length > 0 && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
