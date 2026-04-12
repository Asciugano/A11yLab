import { Subscription } from "@/lib/generated/prisma/enums";
import { getUserIdFromToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const userId = await getUserIdFromToken();
    if (!userId)
      return NextResponse.json(
        { message: "Devi essere loggato per inscriverti al corso" },
        { status: 401 },
      );

    const courseId = (await params).id;

    const existing = await prisma.enrollments.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });

    if (existing)
      return NextResponse.json(
        { message: "Sei gia' iscritto a questo corso" },
        { status: 400 },
      );

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course)
      return NextResponse.json(
        { message: "Impossibile trovare il corso selezionato" },
        { status: 404 },
      );

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return NextResponse.json(
        { message: "Impossibile trovare l'utente" },
        { status: 401 },
      );

    if (
      user.subscription === Subscription.FREE &&
      course.subscription === Subscription.PLUS
    )
      return NextResponse.json(
        {
          message:
            "Impossibile iscriversi a questo corso, devi avere la sottoscrizione PLUS",
        },
        { status: 403 },
      );

    const enrollment = await prisma.enrollments.create({
      data: {
        userId,
        courseId,
      },
    });

    if (!enrollment)
      return NextResponse.json(
        { message: "Impossibile inscriversi a questo corso" },
        { status: 400 },
      );

    return NextResponse.json(enrollment, { status: 201 });
  } catch (e) {
    console.error("error in enroll controller", e);
    return NextResponse.json(
      { message: "Ops... Qualcosa e' adato storto" },
      { status: 500 },
    );
  }
}
