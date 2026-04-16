import { generateCertificateFromHTML } from "@/lib/cert";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: Request) {
  try {
    const data = await req.json();

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
