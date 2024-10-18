/*
  Warnings:

  - Added the required column `contact_secondary` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "contact_secondary" TEXT NOT NULL;
