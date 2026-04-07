import { AlertCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import animation from "../public/lotties/404.json";
import LottieUser from "@/components/LottieUser";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "La pagina che stai cercando non esiste.",
};

export default function NotFound({
  message = "Ops! La pagina che stai cercando non esiste.",
  lottieAnimation = animation,
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <AlertCircle size={48} className="text-primary mb-6" />
      <div className="w-80 h-80 mb-6">
        <LottieUser animationData={lottieAnimation} />
      </div>

      <p className="text-lg mb-6">{message}</p>
      <Link
        href="/"
        className="inline-block bg-primary hover:bg-hover-primary text-white px-6 py-3 rounded-lg transition-colors"
      >
        Torna alla Home
      </Link>
    </div>
  );
}
