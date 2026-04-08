import fs from "fs";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

interface CertificateData {
  userName: string;
  courseTitle: string;
  date: string;
  certCode: string;
  platformName: string;
}

// resUrl può essere un percorso locale o URL scaricabile
export async function generateCertificatePdf(
  templatePath: string,
  data: CertificateData,
) {
  // carica il PDF template
  const existingPdfBytes = fs.readFileSync(templatePath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Scrivi i dati dinamici sopra il PDF template
  firstPage.drawText(data.userName, {
    x: 150,
    y: height - 200,
    size: 20,
    font,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(data.courseTitle, {
    x: 150,
    y: height - 240,
    size: 18,
    font,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(`Rilasciato il: ${data.date}`, {
    x: 150,
    y: height - 280,
    size: 14,
    font,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(`Codice certificato: ${data.certCode}`, {
    x: 150,
    y: height - 310,
    size: 14,
    font,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(data.platformName, {
    x: 150,
    y: height - 350,
    size: 14,
    font,
    color: rgb(0, 0, 0),
  });

  // genera PDF in memoria
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
