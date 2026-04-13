"use client";

import CourseCard from "@/components/CourseCard";
import { useAuth } from "@/context/AuthProvider";
import NotFound from "../not-found";
import animation from "../../public/lotties/404.json";

export default function MyCoursePage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-black text-primary ml-2 mb-3">
        I Miei Corsi
      </h1>
      {!user?.enrollments || user?.enrollments.length <= 0 ? (
        <NotFound lottieAnimation={animation} message="Nulla Qui" />
      ) : (
        <div className="flex flex-col gap-2">
          {user.enrollments.map((e) => (
            <CourseCard key={e.course.id} course={e.course} />
          ))}
        </div>
      )}
    </div>
  );
}
