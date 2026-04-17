"use client";

import { useAuth } from "@/context/AuthProvider";
import NotFound from "../not-found";
import animation from "../../public/lotties/404.json";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AxiosError } from "axios";
import Link from "next/link";

export default function Profile() {
  const { user, loading } = useAuth();

  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loadingF, setLoadingF] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setLoadingF(true);
    setError(null);

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
      setLoadingF(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Loader2 size={20} />
      </div>
    );

  if (!user)
    return (
      <NotFound
        lottieAnimation={animation}
        message="Impossibile trovare l'utente"
      />
    );

  return (
    <div className="min-h-screen m-2">
      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-6 rounded-t-lg rounded-b-2xl shadow-md">
        <div className="max-w-5xl mx-auto flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold tracking-wide mb-2">
              {user.fullName}
            </h1>
            <p className="text-lg opacity-90 max-w-2xl">{user.email}</p>

            <div className="mt-4 flex gap-3 flex-wrap">
              <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
                Ruolo: {user.role}
              </span>
              <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
                Piano: {user.subscription}
              </span>
              <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
                Corsi iscritti:{" "}
                {!user.enrollments ? "0" : user.enrollments.length}
              </span>
            </div>
          </div>

          <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center text-2xl font-bold">
            {user.fullName?.charAt(0)}
          </div>
        </div>
      </div>

      {/* COURSES PROGRESS */}
      <div className="max-w-5xl mx-auto px-6 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-500 mb-6">
          I tuoi corsi
        </h2>

        {user.enrollments && user.enrollments.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {user.enrollments.map((enrollment) => {
              const totalLessons = enrollment.course.lessons.length;

              const completedLessons = user.lessonProgres.filter(
                (lp) =>
                  lp.completed &&
                  enrollment.course.lessons.some((l) => l.id === lp.lessonId),
              ).length;

              const progress =
                totalLessons > 0
                  ? Math.round((completedLessons / totalLessons) * 100)
                  : 0;

              return (
                <div
                  key={enrollment.id}
                  className="rounded-2xl shadow hover:shadow-lg transition p-5 bg-card"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {enrollment.course.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {enrollment.course.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-3 mb-2">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-sm text-gray-500">
                    <span>
                      {completedLessons}/{totalLessons} lezioni
                    </span>
                    <span>{progress}%</span>
                  </div>

                  {enrollment.completed && (
                    <p className="text-green-500 text-sm mt-2">
                      ✔ Corso completato
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-card/50 p-10 rounded-2xl shadow text-center">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-400">
              Non sei iscritto a nessun corso
            </h2>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="w-full mx-auto px-6 mt-20">
        <div className="bg-card/50 rounded-2xl shadow p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Continua a imparare 🚀</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Riprendi da dove avevi lasciato e completa i tuoi corsi.
          </p>
          <Link
            href="/my-courses"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Vai ai corsi
          </Link>
        </div>
      </div>
    </div>
  );
}
