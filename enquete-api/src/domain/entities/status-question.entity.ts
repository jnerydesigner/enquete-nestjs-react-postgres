export class StatusQuestionEntity {
  idStatusQuestion?: number;
  status: string;

  constructor(idStatusQuestion: number, status: string) {
    this.idStatusQuestion = idStatusQuestion;
    this.status = status;
  }
}
