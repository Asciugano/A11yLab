import { getUserIdFromToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { fullName, email, password, subscription } = await req.json();

    const userId = await getUserIdFromToken();
    if (!userId)
      return NextResponse.json(
        { message: "Devi essere loggato per modificare il profilo" },
        { status: 403 },
      );
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return NextResponse.json(
        { message: "Impossibile trovare l'utente" },
        { status: 401 },
      );

    const data = {};
    if (fullName) data.fullName = fullName;
    if (email) data.email = email;
    if (password) data.password = await bcrypt.hash(password, 10);
    if (subscription) data.subscription = subscription;

    if (Object.keys(data).length === 0)
      return NextResponse.json(
        { message: "Devi pero' modificare qualcosa" },
        { status: 400 },
      );

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });

    return NextResponse.json(updatedUser);
  } catch (e) {
    console.error("error in edit controller", e);
    return NextResponse.json(
      { message: "Ops... Qualcosa e' adato storto" },
      { status: 500 },
    );
  }
}
