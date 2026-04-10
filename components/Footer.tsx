import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-card/50 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        {/* Missione */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold tracking-wide">A11yLab</h3>
          <p className="text-sm opacity-90">
            Insegniamo l&apos;importanza dell&apos;accessibilità sul web e come
            creare siti accessibili a tutti, senza barriere.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Link
              href="https://github.com/Asciugano/A11yLab"
              target="_blank"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <FaGithub size={20} />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <FaTwitter size={20} />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <FaLinkedin size={20} />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 pt-4 text-center text-sm opacity-80 mb-2">
        &copy; {new Date().getFullYear()} A11yLab. Tutti i diritti riservati.
      </div>
    </footer>
  );
}
