import { IQuestion } from "@application/interfaces/question.interface";
import { QuestionEntity } from "@entities/question.entity";
import { Questions as RawQuestion, Prisma } from "@prisma/client";
import { CreateQuestionDto } from "@application/DTOs/create-question.dto";
import { StatusQuestionEnum } from "@application/enums/status-question.enum";
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
      createdAt: question.created_at,
      updatedAt: question.updated_at,
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
      createdAt: question.created_at,
      updatedAt: question.updated_at,
      expirationDate: question.expiration_date,
      idStatusQuestion: question.id_status_question,
      status: {
        idStatusQuestion: question.status.id_status_question,
        status: question.status.status,
      },
      answers: question.answers.map((answer) => {
        return AnswerMapper.toDomain(answer);
      }),
    });
  }
}
