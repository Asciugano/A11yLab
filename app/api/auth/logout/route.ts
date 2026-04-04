import { getUserIdFromToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const userID = await getUserIdFromToken();
    if (!userID)
      return NextResponse.json(
        { message: "Prima di poter fare logout devi essere loggato" },
        { status: 401 },
      );

    const user = await prisma.user.findUnique({ where: { id: userID } });
    if (!user)
      return NextResponse.json(
        { message: "Utente sconosciuto" },
        { status: 401 },
      );

    (await cookies()).delete("jwt");

    return NextResponse.json({ message: "Effettuato il logout con successo" });
  } catch (e) {
    console.error("error in logout controller", e);
    return NextResponse.json(
      { message: "Ops... Qualcosa e' adato storto" },
      { status: 500 },
    );
  }
}
