/*
  Warnings:

  - You are about to drop the `CertificateTemplate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Certificate" DROP CONSTRAINT "Certificate_certificateTemplateId_fkey";

-- DropForeignKey
ALTER TABLE "CertificateTemplate" DROP CONSTRAINT "CertificateTemplate_courseId_fkey";

-- DropTable
DROP TABLE "CertificateTemplate";
