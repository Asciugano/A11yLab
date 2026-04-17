"use client";

import { useAuth } from "@/context/AuthProvider";
import { Course } from "@/lib/generated/prisma/client";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CreateCertButton({ course }: { course: Course }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  console.log(url);

  useEffect(() => {
    console.log(url);

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!user) {
        toast.error("Devi essere loggato per generare il certificato");
        setLoading(false);
        return;
      }

      const res = await axios.post(
        `/api/courses/certificate`,
        {
          name: user.fullName,
          email: user.email,
          course: course.title,
          courseId: course.id,
          date: new Date().toLocaleString("IT-it"),
        },
        { responseType: "blob" },
      );

      const blob = await res.data;
      setUrl(window.URL.createObjectURL(blob));
    } catch (e) {
      console.error(e);

      const err = e as AxiosError<{ message?: string }>;
      let message = "Ops... Qualcosa e' andato storto";

      if (err.response?.data.message) message = err.response.data.message;
      else if (typeof err.response?.data === "string")
        message = err.response.data;

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {url && url.length > 0 ? (
        <Link
          href={url}
          download="certificato.pdf"
          className="bg-accent text-white px-6 py-3 rounded-xl hover:bg-hover-accent transition"
        >
          Scarica certificato
        </Link>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-hover-primary transition"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            "Crea certificato"
          )}
        </button>
      )}
    </div>
  );
}
