import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, description, subscription, certificateFile } =
      await req.json();

    if (!title || !description || !certificateFile)
      return NextResponse.json(
        {
          message:
            "Il titolo, la descrizione e il certificato sono campi obbligatori",
        },
        { status: 400 },
      );

    const newCourse = await prisma.course.create({
      data: {
        title,
        description,
        subscription,
        certificate: certificateFile,
      },
    });
    if (!newCourse)
      return NextResponse.json(
        { message: "Impossibile creare il corso" },
        { status: 400 },
      );

    return NextResponse.json({ newCourse }, { status: 201 });
  } catch (e) {
    console.error("error in createCourse controller", e);
    return NextResponse.json(
      { message: "Ops... Qualcosa e' adato storto" },
      { status: 500 },
    );
  }
}
