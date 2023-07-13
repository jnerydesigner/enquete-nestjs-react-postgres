import { IAnswer } from "@application/interfaces/answer.interface";
import * as crypto from "node:crypto";
import { QuestionEntity } from "./question.entity";

export class AnswerEntity {
  private idAnswer: string | null;
  private answer: string;
  private createdAt?: Date;
  private updatedAt?: Date;
  private idQuestion?: string;
  private questions?: QuestionEntity;
  constructor(answer: IAnswer) {
    this.createUUID(answer.idAnswer);
    this.setIdQuestion = answer.idQuestion;
    this.setAnswer = answer.answer;
    this.setCreatedAt = answer.createdAt;
    this.setUpdatedAt = answer.updatedAt;
    this.questions = answer.questions;
  }

  createUUID(idAnswer: string) {
    if (!idAnswer) {
      this.idAnswer = crypto.randomUUID();
    } else {
      this.setIdAnswer = idAnswer;
    }
  }

  get getIdAnswer(): string | null {
    return this.idAnswer;
  }

  set setIdAnswer(value: string) {
    this.idAnswer = value;
  }

  get getIdQuestion(): string {
    return this.idQuestion;
  }

  set setIdQuestion(value: string) {
    this.idQuestion = value;
  }

  get getAnswer(): string {
    return this.answer;
  }

  set setAnswer(value: string) {
    this.answer = value;
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
}
