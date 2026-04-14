"use client";

import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function EnrollButton({ courseId }: { courseId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleEnroll = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    try {
      await axios.post(`/api/courses/${courseId}/enroll`);

      toast.success("Iscrizione completata!");
      router.refresh();
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
        onClick={handleEnroll}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
      >
        {loading ? <Loader2 className="animate-spin" size={20} /> : "Iscriviti"}
      </button>
      {error && error?.length > 0 && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
