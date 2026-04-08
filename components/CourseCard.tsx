import { Course, Subcription } from "@/lib/generated/prisma/client";
import { ArrowRight, Crown, Tag } from "lucide-react";
import Link from "next/link";

interface CourseCardProps {
  course: Course & {
    lessons: { id: string }[];
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  const subscriptionIcon =
    course.subscription === Subcription.PLUS ? (
      <Crown size={20} className="text-yellow-500" />
    ) : (
      <Tag size={20} className="text-green-500" />
    );

  return (
    <div className="rounded-xl p-6 shadow-md dark:shadow-card/50 hover:shadow-lg transition-shadow flex items-center justify-between bg-card mx-2 my-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-2">
          {subscriptionIcon}
          <h2 className="text-xl font-semibold">{course.title}</h2>
        </div>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <p className="text-sm text-gray-500">
          {course.lessons.length} lezion
          {course.lessons.length !== 1 ? "i" : "e"}
        </p>
      </div>

      <Link
        href={`/courses/${course.id}`}
        className="bg-primary hover:bg-hover-primary text-white px-4 py-2 rounded-lg text-center flex items-center justify-center gap-2"
      >
        Vai al corso <ArrowRight className="text-white" />
      </Link>
    </div>
  );
}
