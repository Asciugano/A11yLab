import NotFound from "@/app/not-found";
import { LessonType } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import animation from "../../../public/lotties/404.json";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: { course: true },
  });
  if (!lesson)
    return (
      <NotFound
        lottieAnimation={animation}
        message="impossibile trovare la lezione"
      />
    );

  const ext = lesson.resUrl.split(".").pop()?.toLowerCase();

  return (
    <div className="min-h-screen m-2">
      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-6 rounded-t-lg rounded-b-2xl shadow-md">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">{lesson.title}</h1>
          <p className="text-lg opacity-90 max-w-2xl">{lesson.description}</p>

          <div className="mt-4 flex gap-3 flex-wrap">
            <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
              Tipo: {lesson.type}
            </span>

            <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
              Corso: {lesson.course.title}
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 mt-6">
        <div className="bg-card rounded-2xl shadow p-6">
          {/* VIDEO */}
          {(lesson.type === LessonType.VIDEO ||
            ext === "mp4" ||
            ext === "webm") && (
            <video
              src={lesson.resUrl}
              controls
              className="w-full rounded-xl shadow"
            />
          )}

          {/* PDF */}
          {lesson.type === LessonType.DOCUMENT || ext === "pdf" ? (
            <iframe
              src={lesson.resUrl}
              className="w-full h-[80vh] rounded-xl bg-white"
            />
          ) : null}

          {/* fallback */}
          {!lesson.resUrl && (
            <p className="text-center text-gray-500">
              Nessun contenuto disponibile
            </p>
          )}
        </div>

        {/* BACK */}
        <div className="mt-6">
          <Link
            href={`/courses/${lesson.courseId}`}
            className="text-primary flex items-center justify-center gap-1"
          >
            <ArrowLeft size={16} />
            Torna al corso
          </Link>
        </div>
      </div>
    </div>
  );
}
