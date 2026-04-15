import { LessonType } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as LessonType;
    const courseId = formData.get("courseId") as string;
    const file = formData.get("file") as File;

    // INFO: Se non esistono i parametri necessari o sono vuoti
    if (
      !title ||
      !description ||
      !courseId ||
      !type ||
      !(title.trim().length > 0) ||
      !(description.trim().length > 0)
    )
      return NextResponse.json(
        {
          message:
            "Il titolo, la descrizione, il corso e il tipo sono campi obbligatori",
        },
        { status: 400 },
      );

    if (!file)
      return NextResponse.json(
        {
          message: "Il file della lezione e obbligatorio",
        },
        { status: 400 },
      );

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { lessons: { orderBy: { order: "desc" } } },
    });
    if (!course)
      return NextResponse.json(
        { message: "Impossibile trovare il corso" },
        { status: 404 },
      );

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeName = file.name.replace(/\s+/g, "_");
    const fileName = `${Date.now()}-${safeName}`;
    const filePath = path.join(process.cwd(), "public", "lessons", fileName);

    await writeFile(filePath, buffer);
    const resUrl = `/lessons/${fileName}`;

    const newLesson = await prisma.lesson.create({
      data: {
        title,
        description,
        courseId,
        type,
        resUrl,
        order: !course.lessons[0] ? 0 : course.lessons[0].order + 1,
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
