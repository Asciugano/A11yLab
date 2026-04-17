import { generateCertificateFromHTML } from "@/lib/cert";
import { getUserIdFromToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const userId = await getUserIdFromToken();
    if (!userId)
      return NextResponse.json(
        { message: "Devi essere loggato per questa operazione" },
        { status: 403 },
      );
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return NextResponse.json(
        { message: "Devi essere loggato per questa operazione" },
        { status: 403 },
      );

    const certificate = await prisma.certificate.findUnique({
      where: { userId_courseId: { userId, courseId: data.courseId } },
    });
    if (!certificate) {
      const newCertificate = await prisma.certificate.create({
        data: {
          userId,
          courseId: data.courseId,
        },
      });
      if (!newCertificate)
        return NextResponse.json(
          { message: "Errore nella creazione del certificato" },
          { status: 400 },
        );
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const html = generateCertificateFromHTML(data);

    await page.setContent(html, {
      waitUntil: "load",
    });
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    const blob = new Blob([pdf], {
      type: "application/pdf",
    });
    await browser.close();

    return new NextResponse(blob, {
      headers: {
        "Content-Disposition": "attachment; filename=certificato.pdf",
      },
    });
  } catch (e) {
    console.error("error in createCertificate controller", e);
    return NextResponse.json(
      { message: "Ops... Qualcosa e' adato storto" },
      { status: 500 },
    );
  }
}
