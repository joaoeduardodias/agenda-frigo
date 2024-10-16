/*
  Warnings:

  - You are about to drop the `_EnterpriseToSector` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[contact]` on the table `enterprises` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_EnterpriseToSector" DROP CONSTRAINT "_EnterpriseToSector_A_fkey";

-- DropForeignKey
ALTER TABLE "_EnterpriseToSector" DROP CONSTRAINT "_EnterpriseToSector_B_fkey";

-- DropTable
DROP TABLE "_EnterpriseToSector";

-- CreateTable
CREATE TABLE "_EnterpriseSectors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EnterpriseSectors_AB_unique" ON "_EnterpriseSectors"("A", "B");

-- CreateIndex
CREATE INDEX "_EnterpriseSectors_B_index" ON "_EnterpriseSectors"("B");

-- CreateIndex
CREATE UNIQUE INDEX "enterprises_contact_key" ON "enterprises"("contact");

-- AddForeignKey
ALTER TABLE "_EnterpriseSectors" ADD CONSTRAINT "_EnterpriseSectors_A_fkey" FOREIGN KEY ("A") REFERENCES "enterprises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnterpriseSectors" ADD CONSTRAINT "_EnterpriseSectors_B_fkey" FOREIGN KEY ("B") REFERENCES "sectors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
