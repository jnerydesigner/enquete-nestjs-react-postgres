import { CreateAnswerDto } from "@application/DTOs/create-answer.dto";
import { IAnswer } from "@application/interfaces/answer.interface";
import { AnswerEntity } from "@entities/answer.entity";
import {
  Answers as RawAnswer,
  Prisma,
  Votes as RawVotes,
} from "@prisma/client";

import { QuestionMapper } from "./question.mapper";

export type AnswerWithQuestion = Prisma.AnswersGetPayload<{
  include: {
    Questions: true;
  };
}>;

export class AnswerMapper {
  static toPrisma(answer: AnswerEntity): RawAnswer {
    return {
      id_answer: answer.getIdAnswer,
      answer: answer.getAnswer,
      created_at: answer.getCreatedAt,
      updated_at: answer.getUpdatedAt,
      question_id: answer.getIdQuestion,
    };
  }

  static toDomainNotDate(
    answer: RawAnswer,
    countVotes: number = null,
  ): AnswerEntity {
    return new AnswerEntity({
      idAnswer: answer.id_answer,
      idQuestion: answer.question_id,
      answer: answer.answer,
      countVotes,
    });
  }

  static toDomainWithInterface(answer: IAnswer): AnswerEntity {
    return new AnswerEntity({
      idAnswer: answer.idAnswer,
      idQuestion: answer.idQuestion,
      answer: answer.answer,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    });
  }

  static toDomainBackDTO(answer: CreateAnswerDto): AnswerEntity {
    return new AnswerEntity({
      idAnswer: null,
      idQuestion: answer.idQuestion,
      answer: answer.answer,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static toDomainWithQuestion(
    answer: AnswerWithQuestion,
    countVotes: number = null,
  ): AnswerEntity {
    return new AnswerEntity({
      idAnswer: answer.id_answer,
      idQuestion: answer.question_id,
      answer: answer.answer,
      countVotes,
      questions: QuestionMapper.toDomain(answer.Questions),
    });
  }

  // static toDomainWithAnswer(question: QuestionWithAnswer): QuestionEntity {
  //     return new QuestionEntity({
  //         idQuestion: question.id_question,
  //         question: question.question,
  //         createdAt: question.created_at,
  //         updatedAt: question.updated_at,
  //         answers: question.answers
  //     })
  // }
}

// id_answer: '7cd9691d-a16a-4660-a117-5c8f30ee5eec',
// enquete-api       |     answer: 'Vamos testar a Answer',
// enquete-api       |     created_at: 2023-07-12T21:19:42.437Z,
// enquete-api       |     updated_at: 2023-07-12T21:19:42.437Z,
// enquete-api       |     question_id: '87aa8cec-9269-4a00-892b-e334f9be6dd2',
// enquete-api       |     Questions: { question: 'Atualizando a Question Novamente'
