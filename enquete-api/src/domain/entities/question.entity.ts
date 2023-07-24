import { StatusQuestionEnum } from "@application/enums/status-question.enum";
import { IQuestion } from "@application/interfaces/question.interface";
import * as crypto from "node:crypto";

import { AnswerEntity } from "./answer.entity";
import { StatusQuestionEntity } from "./status-question.entity";

export class QuestionEntity {
  private idQuestion: string | null;
  private question: string;
  private createdAt?: Date;
  private updatedAt?: Date;
  private expirationDate?: Date;
  private idStatusQuestion: StatusQuestionEnum;
  private statusQuestion?: string;
  private countTotalVotes?: number;
  private answers: AnswerEntity[];
  private countRowsAnswers?: number;
  constructor(question: IQuestion) {
    this.createUUID(question.idQuestion);
    this.setQuestion = question.question;
    this.setCreatedAt =
      question.createdAt !== undefined ? question.createdAt : this.getCreatedAt;
    this.setUpdatedAt = question.updatedAt ? question.updatedAt : new Date();
    this.setExpirationDate = question.expirationDate
      ? question.expirationDate
      : this.adicionarDias(new Date(), 10);
    this.setIdStatusQuestion = question.idStatusQuestion;
    this.statusQuestion = question.statusQuestion;
    this.answers = question.answers;
    this.countRowsAnswers = question.countRowsAnswers;
    this.countTotalVotes = question.countTotalVotes;
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
