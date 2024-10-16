/*
  Warnings:

  - You are about to drop the column `state` on the `enterprises` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `users` table. All the data in the column will be lost.
  - Added the required column `contact` to the `enterprises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `enterprises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "enterprises" DROP COLUMN "state",
ADD COLUMN     "contact" TEXT NOT NULL,
ADD COLUMN     "uf" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "telephone",
ADD COLUMN     "contact" TEXT NOT NULL;
