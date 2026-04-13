import animation from "../../public/lotties/empty.json";
import { prisma } from "@/lib/prisma";
import NotFound from "../not-found";
import CourseCard from "@/components/CourseCard";
import { Metadata } from "next";
import CreateLink from "@/components/CreateLink";

export const metadata: Metadata = {
  title: "A11y - Corsi",
};

export default async function Courses() {
  const courses = await prisma.course.findMany({
    include: {
      lessons: true,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex items-end justify-end mb-2 px-6">
        <CreateLink link="/courses/create" text="Crea un corso" />
      </div>
      <h1 className="text-3xl font-black text-primary ml-2 mb-3">
        Tutti i Corsi
      </h1>
      {courses.length <= 0 ? (
        <NotFound lottieAnimation={animation} message="Nulla Qui" />
      ) : (
        <div className="flex flex-col gap-2">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      )}
    </div>
  );
}
