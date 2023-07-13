import { IQuestion } from "@application/interfaces/question.interface";
import * as crypto from "node:crypto";
import { StatusQuestionEnum } from "@application/enums/status-question.enum";
import { AnswerEntity } from "./answer.entity";
import { StatusQuestionEntity } from "./status-question.entity";

export class QuestionEntity {
  private idQuestion: string | null;
  private question: string;
  private createdAt?: Date;
  private updatedAt?: Date;
  private expirationDate?: Date;
  private idStatusQuestion: StatusQuestionEnum;
  private status?: StatusQuestionEntity;
  private answers: AnswerEntity[];
  constructor(question: IQuestion) {
    this.createUUID(question.idQuestion);
    this.setQuestion = question.question;
    this.setCreatedAt = question.createdAt;
    this.setUpdatedAt = question.updatedAt;
    this.setExpirationDate =
      this.getExpirationDate === null
        ? this.getExpirationDate
        : this.adicionarDias(new Date(), 10);
    this.setIdStatusQuestion = question.idStatusQuestion;
    this.status = question.status;
    this.answers = question.answers;
  }

  createUUID(idQuestion: string) {
    if (!idQuestion) {
      this.idQuestion = crypto.randomUUID();
    } else {
      this.setIdQuestion = idQuestion;
    }
  }

  get getIdQuestion(): string | null {
    return this.idQuestion;
  }

  set setIdQuestion(value: string) {
    this.idQuestion = value;
  }

  get getQuestion(): string {
    return this.question;
  }

  set setQuestion(value: string) {
    this.question = value;
  }

  get getIdStatusQuestion(): StatusQuestionEnum {
    return this.idStatusQuestion;
  }

  set setIdStatusQuestion(value: StatusQuestionEnum) {
    this.idStatusQuestion = value;
  }

  get getExpirationDate(): Date {
    return this.expirationDate;
  }

  set setExpirationDate(value: Date) {
    this.expirationDate = value;
  }

  get getCreatedAt(): Date {
    return this.createdAt;
  }

  set setCreatedAt(value: Date) {
    this.createdAt = value;
  }

  get getUpdatedAt(): Date {
    return this.updatedAt;
  }

  set setUpdatedAt(value: Date) {
    this.updatedAt = value;
  }

  adicionarDias(data: Date, dias: number): Date {
    const novaData = new Date(data);
    novaData.setDate(novaData.getDate() + dias);
    return novaData;
  }
}
