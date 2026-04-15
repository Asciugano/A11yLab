import { getUserIdFromToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const userId = await getUserIdFromToken();
    const { id } = await params;
    const lessonId = id;

    if (!userId)
      return NextResponse.json(
        { message: "Devi essere loggato per completare la lezione" },
        { status: 403 },
      );

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { enrollments: true },
    });
    if (!user)
      return NextResponse.json(
        { message: "Impossibile trovare l'utente" },
        { status: 401 },
      );

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson)
      return NextResponse.json(
        { message: "Impossibile trovare la lezione" },
        { status: 404 },
      );

    const enrollments = await prisma.enrollments.findFirst({
      where: { userId, courseId: lesson.courseId },
    });

    if (!enrollments)
      return NextResponse.json(
        { message: "Non sei iscritto a questo corso" },
        { status: 403 },
      );

    const lessons = await prisma.lesson.findMany({
      where: { courseId: lesson.courseId },
      orderBy: { order: "asc" }, // ⚠️ serve campo order
    });

    const currentIndex = lessons.findIndex((l) => l.id === lessonId);

    const previousLessons = lessons.slice(0, currentIndex);

    const progress = await prisma.lessonProgres.findMany({
      where: {
        userId,
        lessonId: {
          in: previousLessons.map((l) => l.id),
        },
      },
    });

    const completedIds = progress
      .filter((p) => p.completed)
      .map((p) => p.lessonId);

    const canComplete = previousLessons.every((l) =>
      completedIds.includes(l.id),
    );

    if (!canComplete) {
      return NextResponse.json(
        { message: "Completa prima le lezioni precedenti" },
        { status: 403 },
      );
    }

    await prisma.lessonProgres.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      update: {
        completed: true,
      },
      create: {
        userId,
        lessonId,
        completed: true,
      },
    });

    return NextResponse.json(
      { message: "Lezione completata" },
      { status: 201 },
    );
  } catch (e) {
    console.error("error in completeLesson controller", e);
    return NextResponse.json(
      { message: "Ops... Qualcosa e' adato storto" },
      { status: 500 },
    );
  }
}
