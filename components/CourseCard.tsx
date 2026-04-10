import { Course } from "@/lib/generated/prisma/client";
import { BookOpen, Lock } from "lucide-react";
import Link from "next/link";

interface CourseCardProps {
  course: Course & {
    lessons: { id: string }[];
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="m-2">
      <Link href={`/courses/${course.id}`}>
        <div className="group bg-card rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 cursor-pointer border border-transparent hover:border-primary/30">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <BookOpen size={18} />
              <span>Corso</span>
            </div>

            {/* Subscription badge */}
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                course.subscription === "FREE"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {course.subscription === "FREE" ? "Gratis" : "Plus"}
            </span>
          </div>

          {/* Titolo */}
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-primary transition">
            {course.title}
          </h3>

          {/* Descrizione */}
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
            {course.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {course.lessons.length} lezioni
            </span>

            <div className="flex items-center gap-1 text-primary font-semibold group-hover:translate-x-1 transition">
              <span>Apri</span>
              {course.subscription === "PLUS" && (
                <Lock size={16} className="text-yellow-500" />
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
