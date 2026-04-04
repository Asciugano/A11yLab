import NotFound from "@/app/not-found";
import animation from "../../../public/lotties/404.json";
import { prisma } from "@/lib/prisma";

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
    <div>
      corso {course.title} <span>{course.lessons.length}</span>
    </div>
  );
}
