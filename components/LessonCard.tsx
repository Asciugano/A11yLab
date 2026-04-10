import { Lesson, LessonType } from "@/lib/generated/prisma/client";
import { Play, File } from "lucide-react";

interface LessonCardProps {
  lesson: Lesson;
}

export default function LessonCard({ lesson }: LessonCardProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-card rounded-2xl shadow-md hover:shadow-lg transition p-4 cursor-pointer">
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

      {/* Link o badge risorsa */}
      {lesson.resUrl && (
        <div className="mt-3 md:mt-0 md:ml-4">
          <a
            href={lesson.resUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-white bg-gradient-primary px-4 py-2 rounded-xl shadow hover:scale-105 transition"
          >
            Vai alla risorsa
          </a>
        </div>
      )}
    </div>
  );
}
