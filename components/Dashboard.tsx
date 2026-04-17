import { FullUser } from "@/types/user";
import Link from "next/link";

export default function Dashboard({ user }: { user: FullUser }) {
  const recentCourses = user.enrollments?.slice(0, 2) || [];

  return (
    <div className="min-h-screen m-2">
      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-10 px-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-2">
          Bentornato, {user.fullName} 👋
        </h1>
        <p className="opacity-90">Continua da dove avevi lasciato</p>
      </div>

      {/* RECENT COURSES */}
      <div className="max-w-5xl mx-auto px-6 mt-8">
        <h2 className="text-2xl font-bold mb-6">I tuoi ultimi corsi</h2>

        {recentCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {recentCourses.map((enrollment) => {
              const totalLessons = enrollment.course.lessons.length;

              const completedLessons = user.lessonProgres.filter(
                (lp) =>
                  lp.completed &&
                  enrollment.course.lessons.some((l) => l.id === lp.lessonId),
              ).length;

              const progress =
                totalLessons > 0
                  ? Math.round((completedLessons / totalLessons) * 100)
                  : 0;

              return (
                <div
                  key={enrollment.id}
                  className="bg-card p-5 rounded-2xl shadow"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {enrollment.course.title}
                  </h3>

                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <p className="text-sm text-gray-500">
                    {progress}% completato
                  </p>

                  <Link
                    href={`/courses/${enrollment.course.id}`}
                    className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700"
                  >
                    Continua
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-card/50 p-10 rounded-2xl shadow text-center">
            <p className="text-gray-600">Non sei ancora iscritto a corsi</p>
          </div>
        )}
      </div>
    </div>
  );
}
