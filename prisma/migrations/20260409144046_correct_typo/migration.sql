/*
  Warnings:

  - The `subscription` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `subscription` on the `Course` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Subscription" AS ENUM ('FREE', 'PLUS');

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "subscription",
ADD COLUMN     "subscription" "Subscription" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "subscription",
ADD COLUMN     "subscription" "Subscription" NOT NULL DEFAULT 'FREE';

-- DropEnum
DROP TYPE "Subcription";
