"use client";

import { useAuth } from "@/context/AuthProvider";
import { UserRole } from "@/lib/generated/prisma/enums";
import { Plus } from "lucide-react";
import Link from "next/link";

interface Props {
  link: string;
  text: string;
}

export default function CreateLink({ link, text }: Props) {
  const { user } = useAuth();

  if (!user || user.role === UserRole.USER) return null;

  return (
    <Link
      href={link}
      className="bg-accent hover:bg-hover-accent text-white text-center rounded-lg flex items-center justify-center gap-1 px-3 py-2"
    >
      <Plus size={16} />
      {text}
    </Link>
  );
}
