import { StatusQuestionEnum } from "@application/enums/status-question.enum";
import { AnswerEntity } from "@entities/answer.entity";
import { StatusQuestionEntity } from "@entities/status-question.entity";

export interface IQuestion {
  idQuestion?: string | null;
  question: string;
  expirationDate?: Date;
  idStatusQuestion?: StatusQuestionEnum;
  createdAt?: Date;
  updatedAt?: Date;
  statusQuestion?: string;
  countRowsAnswers?: number;
  countTotalVotes?: number;
  answers?: AnswerEntity[];
}
