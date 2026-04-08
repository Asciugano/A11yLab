import { generateCertificatePdf } from "@/lib/cert";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request, params: Promise<{ id: string }>) {
  const { id } = await params;
  const { userID } = await req.json();

  const user = await prisma.user.findUnique({ where: { id: userID } });
  if (!user)
    return NextResponse.json(
      { message: "Impossibile trovare l'utente" },
      { status: 404 },
    );

  const course = await prisma.course.findUnique({
    where: { id },
    include: { certificate: true },
  });
  if (!course)
    return NextResponse.json({ message: "Corso inesistente" }, { status: 404 });

  if (!course.certificate || !course.certificate.resUrl)
    return NextResponse.json(
      { message: "Impossibile trovare il ceritficato o il suo url" },
      { status: 404 },
    );
  const templatePath = path.resolve(course.certificate.resUrl);

  const pdfBytes = await generateCertificatePdf(templatePath, {
    userName: user.fullName,
    courseTitle: course.title,
    date: new Date().toLocaleDateString("it-IT"),
    certCode: "TEST",
    platformName: "A11yLab",
  });

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=certificate.pdf`,
    },
  });
}
