import NotFound from "@/app/not-found";
import animation from "../../../public/lotties/404.json";
import { prisma } from "@/lib/prisma";
import CreateLink from "@/components/CreateLink";
import LessonCard from "@/components/LessonCard";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const course = await prisma.course.findUnique({
    where: { id },
    include: { lessons: true },
  });

  if (!course)
    return (
      <NotFound
        message="Impossibile trovare il corso"
        lottieAnimation={animation}
      />
    );

  return (
    <div className="min-h-screen m-2">
      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-6 rounded-t-lg rounded-b-2xl shadow-md">
        <div>
          <div className="max-w-5xl mx-auto flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold tracking-wide mb-2">
                {course.title}
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

            <CreateLink link="#" text="Nuova lezione" />
          </div>
        </div>
      </div>

      {/* LESSONS */}
      <div className="max-w-5xl mx-auto px-6 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-500 mb-6">
          Lezioni del corso
        </h2>

        {course.lessons.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {course.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-card/50 rounded-2xl shadow hover:shadow-lg transition p-4"
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
          <h3 className="text-xl font-bold mb-2">Completa il corso 🎓</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Segui tutte le lezioni per ottenere il certificato finale.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
            Continua il corso
          </button>
        </div>
      </div>
    </div>
  );
}
