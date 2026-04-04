import { getUserIdFromToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userID = await getUserIdFromToken();
    console.log(userID);
    if (!userID)
      return NextResponse.json(
        {
          message:
            "Impossibile trovare l'id dell'utente perfavore fare di nuovo il login",
        },
        { status: 401 },
      );

    const user = await prisma.user.findUnique({ where: { id: userID } });
    if (!user)
      return NextResponse.json(
        { message: "Utente inesistente" },
        { status: 404 },
      );
    return NextResponse.json({ user });
  } catch (e) {
    console.error("error in me controller", e);
    return NextResponse.json(
      { message: "Ops... Qualcosa e' adato storto" },
      { status: 500 },
    );
  }
}
