/*
  Warnings:

  - You are about to drop the column `subcription` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "subcription",
ADD COLUMN     "subscription" "Subcription" NOT NULL DEFAULT 'FREE';
