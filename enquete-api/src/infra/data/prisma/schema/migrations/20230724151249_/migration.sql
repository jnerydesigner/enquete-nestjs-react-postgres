/*
  Warnings:

  - You are about to drop the column `status` on the `StatusQuestion` table. All the data in the column will be lost.
  - Added the required column `status_question` to the `StatusQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StatusQuestion" DROP COLUMN "status",
ADD COLUMN     "status_question" TEXT NOT NULL;
