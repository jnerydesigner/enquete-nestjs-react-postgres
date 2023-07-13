import { AnswerEntity } from "@entities/answer.entity";

export abstract class AnswerPrismaRepositoryImplements {
  abstract createAnswer(answer: AnswerEntity): Promise<AnswerEntity>;
  abstract findAll(): Promise<AnswerEntity[]>;
  abstract updateAnswer(id: string, answer: string): Promise<AnswerEntity>;
  abstract findAnswerById(id: string): Promise<AnswerEntity>;
}
