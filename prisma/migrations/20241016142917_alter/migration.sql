/*
  Warnings:

  - You are about to drop the `_EnterpriseSectors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EnterpriseSectors" DROP CONSTRAINT "_EnterpriseSectors_A_fkey";

-- DropForeignKey
ALTER TABLE "_EnterpriseSectors" DROP CONSTRAINT "_EnterpriseSectors_B_fkey";

-- DropTable
DROP TABLE "_EnterpriseSectors";

-- CreateTable
CREATE TABLE "sector_enterprise" (
    "enterprise_id" TEXT NOT NULL,
    "sector_id" TEXT NOT NULL,

    CONSTRAINT "sector_enterprise_pkey" PRIMARY KEY ("enterprise_id","sector_id")
);

-- AddForeignKey
ALTER TABLE "sector_enterprise" ADD CONSTRAINT "sector_enterprise_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "enterprises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sector_enterprise" ADD CONSTRAINT "sector_enterprise_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "sectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
