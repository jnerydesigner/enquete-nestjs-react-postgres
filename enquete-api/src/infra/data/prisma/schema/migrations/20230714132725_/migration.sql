/*
  Warnings:

  - You are about to alter the column `vote` on the `Votes` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Votes" ALTER COLUMN "vote" SET DATA TYPE INTEGER;
