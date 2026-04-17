/*
  Warnings:

  - You are about to drop the column `certificateTemplateId` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `resUrl` on the `Certificate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Certificate" DROP COLUMN "certificateTemplateId",
DROP COLUMN "resUrl";
