/*
  Warnings:

  - Added the required column `sector_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "sector_id" TEXT NOT NULL,
ADD COLUMN     "telephone" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "sectors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sectors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EnterpriseToSector" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EnterpriseToSector_AB_unique" ON "_EnterpriseToSector"("A", "B");

-- CreateIndex
CREATE INDEX "_EnterpriseToSector_B_index" ON "_EnterpriseToSector"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "sectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnterpriseToSector" ADD CONSTRAINT "_EnterpriseToSector_A_fkey" FOREIGN KEY ("A") REFERENCES "enterprises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnterpriseToSector" ADD CONSTRAINT "_EnterpriseToSector_B_fkey" FOREIGN KEY ("B") REFERENCES "sectors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
