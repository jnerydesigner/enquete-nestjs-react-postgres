import { QuestionEntity } from "@entities/question.entity";

export abstract class QuestionPrismaRepositoryImplements {
  abstract createQuestion(question: QuestionEntity): Promise<QuestionEntity>;
  abstract findAll(): Promise<QuestionEntity[]>;
  abstract finalizedQuestion(
    idQuestion: string,
    idStatusQuestion: number,
  ): Promise<QuestionEntity>;
  abstract updateQuestion(
    idQuestion: string,
    question: string,
  ): Promise<QuestionEntity>;
  abstract findQuestionById(id: string): Promise<QuestionEntity>;
  abstract deleteQuestion(id: string): Promise<void>;
}
