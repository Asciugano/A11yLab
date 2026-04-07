import { Lesson } from "@/lib/generated/prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Prop {
  lesson: Lesson;
}

export default function LessonCard({ lesson }: Prop) {
  return (
    <div className="rounded-xl p-6 shadow-md dark:shadow-card/50 hover:shadow-lg transition-shadow flex items-center justify-between bg-card mx-2 my-2">
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold mb-2">{lesson.title}</h2>
        <p className="text-gray-600 mb-4">{lesson.description}</p>
      </div>

      <Link
        href={`/lessons/${lesson.id}`}
        className="bg-primary hover:bg-hover-primary text-white px-4 py-2 rounded-lg text-center flex items-center justify-center gap-2"
      >
        Vai al corso <ArrowRight className="text-white" />
      </Link>
    </div>
  );
}
