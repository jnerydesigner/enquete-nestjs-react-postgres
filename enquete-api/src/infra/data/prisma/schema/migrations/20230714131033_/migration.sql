-- CreateTable
CREATE TABLE "Votes" (
    "id_vote" SERIAL NOT NULL,
    "vote" BIGINT NOT NULL,
    "question_id" UUID,
    "answer_id" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Votes_pkey" PRIMARY KEY ("id_vote")
);

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Questions"("id_question") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "Answers"("id_answer") ON DELETE SET NULL ON UPDATE CASCADE;
