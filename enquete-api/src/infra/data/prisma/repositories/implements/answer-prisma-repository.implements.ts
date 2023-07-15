import { AnswerEntity } from "@entities/answer.entity";
import { VoteEntity } from "@entities/vote.entity";

export abstract class AnswerPrismaRepositoryImplements {
  abstract createAnswer(answer: AnswerEntity): Promise<AnswerEntity>;
  abstract findAll(): Promise<AnswerEntity[]>;
  abstract updateAnswer(id: string, answer: string): Promise<AnswerEntity>;
  abstract findAnswerById(id: string): Promise<AnswerEntity>;
  abstract deleteAnswer(id: string): Promise<void>;
  abstract voteAnswer(vote: VoteEntity): Promise<VoteEntity>;
}
