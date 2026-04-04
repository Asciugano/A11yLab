import { generateToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json(
        { message: "Devi specificare tutti i campi necessari" },
        { status: 400 },
      );

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return NextResponse.json(
        { message: "Cerdenziali invalide" },
        { status: 401 },
      );

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return NextResponse.json(
        { message: "Cerdenziali invalide" },
        { status: 401 },
      );

    const token = await generateToken(user.id);
    (await cookies()).set({
      name: "jwt",
      value: token,
      maxAge: 24 * 60 * 60,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NEXT_ENV !== "dev",
      path: "/",
    });
    console.log((await cookies()).get("jwt"));

    return NextResponse.json(user);
  } catch (e) {
    console.error("error in login controller", e);
    return NextResponse.json(
      { message: "Ops... Qualcosa e' adato storto" },
      { status: 500 },
    );
  }
}
