import NotFound from "@/app/not-found";
import { LessonType } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import animation from "../../../public/lotties/404.json";
import { getUserIdFromToken } from "@/lib/jwt";
import { redirect } from "next/navigation";
import CompleteButton from "@/components/CompleteButton";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = await getUserIdFromToken();
  if (!userId)
    return (
      <NotFound
        lottieAnimation={animation}
        message="Impossibile trovare l'utente"
      />
    );
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user)
    return (
      <NotFound
        lottieAnimation={animation}
        message="Impossibile trovare l'utente"
      />
    );

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: { course: { include: { lessons: true } } },
  });
  if (!lesson)
    return (
      <NotFound
        lottieAnimation={animation}
        message="impossibile trovare la lezione"
      />
    );

  const previousLesson = lesson.course.lessons.slice(0, lesson.order);
  const progress = await prisma.lessonProgres.findMany({
    where: {
      userId,
      lessonId: {
        in: previousLesson.map((l) => l.id),
      },
    },
  });

  const completedIds = progress
    .filter((p) => p.completed)
    .map((p) => p.lessonId);

  const canAccess = previousLesson.every((l) => completedIds.includes(l.id));

  if (!canAccess) {
    return redirect(`/courses/${lesson.courseId}`);
  }

  const ext = lesson.resUrl.split(".").pop()?.toLowerCase();

  const currentProgress = await prisma.lessonProgres.findUnique({
    where: { userId_lessonId: { userId, lessonId: id } },
  });
  const isCompleted = currentProgress?.completed ?? false;
  const nextLesson = lesson.course.lessons[lesson.order + 1];

  return (
    <div className="min-h-screen m-2">
      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-6 rounded-t-lg rounded-b-2xl shadow-md">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-bold mb-2">{lesson.title}</h1>
            {isCompleted && <CheckCircle size={20} />}
          </div>
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

        <div className="w-full mx-auto px-6 mt-20">
          <div className="bg-card/50 rounded-2xl shadow p-8 text-center">
            <h3 className="text-xl font-bold mb-2">Completa il corso 🎓</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Segui tutte le lezioni per ottenere il certificato finale.
            </p>
            {!isCompleted ? (
              <CompleteButton lesson={lesson} nextLesson={nextLesson} />
            ) : (
              <Link
                className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-hover-primary transition"
                href={
                  nextLesson
                    ? `/lessons/${nextLesson.id}`
                    : `/courses/${lesson.courseId}`
                }
              >
                {nextLesson ? "Prossima Lezione" : "Torna al Corso"}
              </Link>
            )}
          </div>
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
