import { getUserIdFromToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import NotFound from "../not-found";
import animation from "../../public/lotties/404.json";

export default async function Certificates() {
  const userId = await getUserIdFromToken();
  if (!userId)
    return (
      <NotFound
        lottieAnimation={animation}
        message="Impossibile trovare l'utente"
      />
    );
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user)
    return (
      <NotFound
        lottieAnimation={animation}
        message="Impossibile trovare l'utente"
      />
    );

  const certificates = await prisma.certificate.findMany({
    where: { userId },
    include: { course: true },
  });

  return (
    <div className="max-w-5xl mx-auto px-6 mt-12">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-500 mb-6">
        I tuoi certificati
      </h2>

      {certificates && certificates.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="rounded-2xl shadow hover:shadow-lg transition p-5 bg-card flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {cert.course.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {cert.course.description}
                </p>

                <p className="text-xs text-gray-500">
                  Rilasciato il{" "}
                  {new Date(cert.createdAt).toLocaleDateString("IT-it")}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card/50 p-10 rounded-2xl shadow text-center">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-400">
            Non hai ancora certificati
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Completa un corso per ottenerne uno 🎓
          </p>
        </div>
      )}
    </div>
  );
}
