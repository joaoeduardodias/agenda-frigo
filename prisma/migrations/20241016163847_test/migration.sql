/*
  Warnings:

  - The primary key for the `sector_enterprise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `sector_enterprise` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_sector_id_fkey";

-- AlterTable
ALTER TABLE "sector_enterprise" DROP CONSTRAINT "sector_enterprise_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "sector_enterprise_pkey" PRIMARY KEY ("enterprise_id", "sector_id");

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "sectorId" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "sectors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
