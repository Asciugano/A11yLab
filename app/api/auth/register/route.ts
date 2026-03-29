import { generateToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, fullName, role, subscription } = await req.json();

    if (!email || !password || !fullName)
      return NextResponse.json(
        { message: "Devi inserire tutti i campi richiesti" },
        { status: 400 },
      );

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return NextResponse.json(
        { message: "Impossibile creare un account con questa email" },
        { status: 401 },
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        ...(role && { role }),
        ...(subscription && { subscription }),
      },
    });

    const token = await generateToken(newUser.id);
    return NextResponse.json({ newUser }, { status: 201 });
  } catch (e) {
    console.error("error in register controller", e);
    return NextResponse.json(
      { message: "Ops... Qualcosa e' adato storto" },
      { status: 500 },
    );
  }
}
