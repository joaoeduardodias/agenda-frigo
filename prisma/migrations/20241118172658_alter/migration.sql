/*
  Warnings:

  - The `contact_secondary` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `contact` on the `enterprises` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `contact` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "enterprises" DROP COLUMN "contact",
ADD COLUMN     "contact" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "contact",
ADD COLUMN     "contact" DOUBLE PRECISION NOT NULL,
DROP COLUMN "contact_secondary",
ADD COLUMN     "contact_secondary" DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "enterprises_contact_key" ON "enterprises"("contact");
