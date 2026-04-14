import { Lesson, LessonType } from "@/lib/generated/prisma/client";
import { Play, File } from "lucide-react";
import Link from "next/link";

interface LessonCardProps {
  lesson: Lesson;
}

export default function LessonCard({ lesson }: LessonCardProps) {
  return (
    <div className="mt-2">
      <Link href={`/lessons/${lesson.id}`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-card rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 cursor-pointer border border-transparent hover:border-primary/30">
          {/* Icona tipo lezione */}
          <div className="flex-shrink-0 mr-4 mb-2 md:mb-0">
            {lesson.type === LessonType.VIDEO ? (
              <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-md">
                <Play size={20} />
              </div>
            ) : (
              <div className="w-12 h-12 flex items-center justify-center bg-yellow-400 text-white rounded-full shadow-md">
                <File size={20} />
              </div>
            )}
          </div>

          {/* Contenuto lezione */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {lesson.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
              {lesson.description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
