import { QuestionEntity } from "@entities/question.entity";

export interface IAnswer {
  idAnswer?: string | null;
  answer: string;
  createdAt?: Date;
  updatedAt?: Date;
  idQuestion?: string;
  questions?: QuestionEntity;
}
