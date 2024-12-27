/*
  Warnings:

  - The primary key for the `sector_enterprise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `sector_enterprise` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "sector_enterprise" DROP CONSTRAINT "sector_enterprise_enterprise_id_fkey";

-- AlterTable
ALTER TABLE "sector_enterprise" DROP CONSTRAINT "sector_enterprise_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "enterprise_id" DROP NOT NULL,
ADD CONSTRAINT "sector_enterprise_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "sector_enterprise" ADD CONSTRAINT "sector_enterprise_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "enterprises"("id") ON DELETE SET NULL ON UPDATE CASCADE;
