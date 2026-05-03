import NotFound from "@/app/not-found";
import animation from "../../../public/lotties/404.json";
import { prisma } from "@/lib/prisma";
import CreateLink from "@/components/CreateLink";
import LessonCard from "@/components/LessonCard";
import EnrollButton from "@/components/EnrollButton";
import { getUserIdFromToken } from "@/lib/jwt";
import Link from "next/link";
import CreateCertButton from "@/components/CreateCertButton";
import { CheckCircle } from "lucide-react";

export default async function CoursePage({
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
        message="Impossibile trovare il corso"
      />
    );

  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      lessons: {
        orderBy: { order: "asc" },
      },
      enrollments: {
        where: { userId },
      },
    },
  });

  if (!course)
    return (
      <NotFound
        message="Impossibile trovare il corso"
        lottieAnimation={animation}
      />
    );

  console.log(course.enrollments);
  const completed = !course.enrollments[0]
    ? false
    : (course.enrollments[0].completed ?? false);

  return (
    <div className="min-h-screen m-2">
      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-6 rounded-t-lg rounded-b-2xl shadow-md">
        <div>
          <div className="max-w-5xl mx-auto flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold tracking-wide mb-2 flex gap-2 items-center">
                {course.title}
                {completed && <CheckCircle size={20} />}
              </h1>
              <p className="text-lg opacity-90 max-w-2xl">
                {course.description}
              </p>
              <div className="mt-4">
                <span className="bg-card/20 px-4 py-1 rounded-full text-sm">
                  Piano: {course.subscription}
                </span>
              </div>
            </div>

            <CreateLink
              link={`/courses/${course.id}/lessons/create`}
              text="Nuova lezione"
            />
          </div>
        </div>
      </div>

      {/* LESSONS */}
      <div className="max-w-5xl mx-auto px-6 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-500 mb-6">
          Lezioni del corso
        </h2>

        {course.lessons.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 bg-card/50 rounded-xl">
            {course.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="rounded-2xl shadow hover:shadow-lg transition p-4"
              >
                <LessonCard lesson={lesson} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card/50 p-10 rounded-2xl shadow text-center">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-400">
              Nessuna lezione disponibile
            </h2>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="w-full mx-auto px-6 mt-20">
        <div className="bg-card/50 rounded-2xl shadow p-8 text-center">
          <h3 className="text-xl font-bold mb-2">
            {!completed ? "Completa il corso 🎓" : "Hai Completato il corso 👏"}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {!completed
              ? "Segui tutte le lezioni per ottenere il certificato finale."
              : "Clicca qui sotto per il tuo certificato"}
          </p>
          {!course.enrollments[0] ? (
            <EnrollButton courseId={course.id} />
          ) : !completed ? (
            <Link href="#">Vai alla lezione </Link>
          ) : (
            <CreateCertButton course={course} />
          )}
        </div>
      </div>
    </div>
  );
}
