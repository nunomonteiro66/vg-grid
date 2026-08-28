/*
  Warnings:

  - You are about to drop the column `search_vector` on the `Games` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Games" DROP COLUMN "search_vector",
ALTER COLUMN "coverUrl" DROP NOT NULL;
