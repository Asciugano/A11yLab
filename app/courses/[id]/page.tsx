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
    <div className="p-6">
      <div className="flex items-end justify-end mb-6">
        <CreateLink link="#" text="Crea una lezione" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl text-primary text-center font-bold tracking-wide">
          {course.title}
        </h1>
        <p className="text-sm text-gray-600">{course.description}</p>
        <div className="mt-6">
          {course.lessons.length > 0 ? (
            <div>
              {course.lessons.map((l) => (
                <div key={l.id}>
                  <LessonCard lesson={l} />
                </div>
              ))}
            </div>
          ) : (
            <h2 className="text-xl text-primary font-bold">Nessuna lezione</h2>
          )}
        </div>
      </div>
    </div>
  );
}
