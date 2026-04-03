import animation from "../../public/lotties/empty.json";
import { prisma } from "@/lib/prisma";
import NotFound from "../not-found";
import CourseCard from "@/components/CourseCard";

export default async function Courses() {
  const courses = await prisma.course.findMany({
    include: {
      lessons: true,
    },
  });

  if (courses.length <= 0)
    return <NotFound lottieAnimation={animation} message="Nulla Qui" />;

  return (
    <div>
      {courses.map((c) => (
        <CourseCard key={c.id} course={c} />
      ))}
    </div>
  );
}
