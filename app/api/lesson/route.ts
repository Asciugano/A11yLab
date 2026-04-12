import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, description, courseId, type, resUrl } = await req.json();

    if (!title || !description || !courseId || !type)
      return NextResponse.json(
        {
          message:
            "Il titolo, la descrizione, il corso e il tipo sono campi obbligatori",
        },
        { status: 400 },
      );

    const newLesson = await prisma.lesson.create({
      data: {
        title,
        description,
        courseId,
        type,
        resUrl,
      },
    });
    if (!newLesson)
      return NextResponse.json(
        { message: "Impossibile creare la Lezione" },
        { status: 500 },
      );

    return NextResponse.json({ newLesson }, { status: 201 });
  } catch (e) {
    console.error("error in createCourse controller", e);
    return NextResponse.json(
      { message: "Ops... Qualcosa e' adato storto" },
      { status: 500 },
    );
  }
}
