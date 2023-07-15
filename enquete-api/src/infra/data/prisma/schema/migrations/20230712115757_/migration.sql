-- AlterTable
ALTER TABLE "Author" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Questions" (
    "id_question" UUID NOT NULL,
    "question" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id_question")
);

-- CreateTable
CREATE TABLE "Answers" (
    "id_answer" UUID NOT NULL,
    "answer" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "question_id" UUID,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("id_answer")
);

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Questions"("id_question") ON DELETE SET NULL ON UPDATE CASCADE;
