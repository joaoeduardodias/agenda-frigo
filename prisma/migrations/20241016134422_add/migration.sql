/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `sectors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sectors_name_key" ON "sectors"("name");
