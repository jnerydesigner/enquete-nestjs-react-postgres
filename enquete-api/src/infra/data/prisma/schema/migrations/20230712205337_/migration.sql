/*
  Warnings:

  - You are about to drop the column `status` on the `Questions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "status",
ADD COLUMN     "id_status_question" INTEGER;

-- CreateTable
CREATE TABLE "StatusQuestion" (
    "id_status_question" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "StatusQuestion_pkey" PRIMARY KEY ("id_status_question")
);

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_id_status_question_fkey" FOREIGN KEY ("id_status_question") REFERENCES "StatusQuestion"("id_status_question") ON DELETE SET NULL ON UPDATE CASCADE;
