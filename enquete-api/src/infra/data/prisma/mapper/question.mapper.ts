import { CreateQuestionDto } from "@application/DTOs/create-question.dto";
import { StatusQuestionEnum } from "@application/enums/status-question.enum";
import { IQuestion } from "@application/interfaces/question.interface";
import { QuestionEntity } from "@entities/question.entity";
import { Questions as RawQuestion, Prisma } from "@prisma/client";

import { AnswerMapper } from "./answer.mapper";

export type QuestionWithAnswer = Prisma.QuestionsGetPayload<{
  include: {
    answers: true;
    status: {
      select: {
        id_status_question: true;
        status: true;
      };
    };
    votes: {
      select: {
        vote: true;
        answer_id: true;
      };
    };
  };
}>;

export class QuestionMapper {
  static toPrisma(question: QuestionEntity): RawQuestion {
    return {
      id_question: question.getIdQuestion,
      question: question.getQuestion,
      created_at: question.getCreatedAt,
      updated_at: question.getUpdatedAt,
      expiration_date: question.getExpirationDate,
      id_status_question: question.getIdStatusQuestion,
    };
  }

  static toDomain(question: RawQuestion): QuestionEntity {
    return new QuestionEntity({
      idQuestion: question.id_question,
      question: question.question,
      expirationDate: question.expiration_date,
      idStatusQuestion: question.id_status_question,
    });
  }

  static toDomainBackDTO(question: CreateQuestionDto): QuestionEntity {
    return new QuestionEntity({
      idQuestion: null,
      question: question.question,
      createdAt: new Date(),
      updatedAt: new Date(),
      expirationDate: null,
      idStatusQuestion: StatusQuestionEnum.Ativa,
    });
  }

  static toDomainWithInterface(question: IQuestion): QuestionEntity {
    return new QuestionEntity({
      idQuestion: question.idQuestion,
      question: question.question,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
      expirationDate: question.expirationDate,
      idStatusQuestion: question.idStatusQuestion,
    });
  }

  static toDomainWithAnswer(question: QuestionWithAnswer): QuestionEntity {
    return new QuestionEntity({
      idQuestion: question.id_question,
      question: question.question,
      expirationDate: question.expiration_date,
      idStatusQuestion: question.id_status_question,
      status: question.status.status,
      answers: question.answers.map((answer) => {
        const vote = question.votes.find(
          (vote) => vote.answer_id === answer.id_answer,
        );
        return AnswerMapper.toDomainNotDate(answer, vote.vote);
      }),
    });
  }

  static toDomainWithAnswerCount(
    question: QuestionWithAnswer,
    countAnswer: number,
    totalVotes: number,
  ): QuestionEntity {
    return new QuestionEntity({
      idQuestion: question.id_question,
      question: question.question,
      expirationDate: question.expiration_date,
      idStatusQuestion: question.id_status_question,
      status: question.status.status,
      countRowsAnswers: countAnswer,
      countTotalVotes: totalVotes,
      answers: question.answers.map((answer) => {
        if (!question.votes || question.votes === null) {
          return AnswerMapper.toDomainNotDate(answer, 0);
        }
        const answerCountTotal = question.votes?.find(
          (f) => f.answer_id === answer.id_answer,
        );

        if (answerCountTotal === undefined) {
          return AnswerMapper.toDomainNotDate(answer, 0);
        }
        return AnswerMapper.toDomainNotDate(answer, answerCountTotal.vote);
      }),
    });
  }
}
