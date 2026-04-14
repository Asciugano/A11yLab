import { generateToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, fullName, role, subscription } = await req.json();

    if (
      !email ||
      !password ||
      !fullName ||
      !email.trim() ||
      !password.trim() ||
      !fullName.trim()
    )
      return NextResponse.json(
        { message: "Devi inserire tutti i campi richiesti" },
        { status: 400 },
      );

    const validEmail = (email: string) =>
      /^[^\s@]+@[^\s@]+\.[^\@]+$/.test(email);
    if (!validEmail(email))
      return NextResponse.json(
        { message: "L'email deve essere una email valida" },
        { status: 400 },
      );

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return NextResponse.json(
        { message: "Impossibile creare un account con questa email" },
        { status: 401 },
      );
    const validPassword = (password: string) =>
      /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_].+$)/.test(password);
    if (!validPassword(password) || password.length < 6)
      return NextResponse.json(
        {
          message:
            "La password deve contenere almeno 6 caratteri, una Lettera maiuscola, un numero e un carattere specale",
        },
        { status: 400 },
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

    if (!newUser)
      return NextResponse.json(
        { message: "impossibile creare il nuovo utente" },
        { status: 400 },
      );

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
