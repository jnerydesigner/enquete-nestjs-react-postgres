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
    Votes: {
      select: {
        answer_id: true;
        question_id: true;
        vote: true;
      };
    };
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
      countVotes: answer.Votes.find(
        (vote) => vote.answer_id === answer.id_answer,
      )?.vote,
      questions: QuestionMapper.toDomain(answer.Questions),
    });
  }
}
