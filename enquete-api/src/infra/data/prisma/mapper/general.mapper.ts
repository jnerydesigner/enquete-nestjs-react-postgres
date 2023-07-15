export class GeneralMapper {
  static toReduce(object: any): any {
    return {
      vote: object.vote,
      idAnswer: object.answer_id,
      idQuestion: object.question_id,
    };
  }
}
