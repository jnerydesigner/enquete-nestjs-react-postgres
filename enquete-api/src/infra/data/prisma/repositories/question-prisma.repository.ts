import { StatusQuestionEnum } from "@application/enums/status-question.enum";
import { QuestionEntity } from "@entities/question.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { PrismaService } from "../client/prisma.service";
import { GeneralMapper } from "../mapper/general.mapper";
import { QuestionMapper } from "../mapper/question.mapper";
import { QuestionPrismaRepositoryImplements } from "./implements/question-prisma-repository.implements";

@Injectable()
export class QuestionPrismaRepository
  implements QuestionPrismaRepositoryImplements
{
  constructor(private readonly prismaService: PrismaService) {}

  async findQuestionById(id: string): Promise<QuestionEntity> {
    const questionExists = await this.prismaService.questions.findFirst({
      where: {
        id_question: id,
      },
      include: {
        answers: true,
        status: true,
        votes: {
          select: {
            vote: true,
            answer_id: true,
          },
        },
      },
    });
    if (!questionExists) {
      throw new HttpException(
        "Questions don´t no exists",
        HttpStatus.NOT_FOUND,
      );
    }
    return QuestionMapper.toDomainWithAnswer(questionExists);
  }
  async updateQuestion(
    idQuestion: string,
    question: string,
  ): Promise<QuestionEntity> {
    const questionExists = await this.prismaService.questions.findFirst({
      where: {
        id_question: idQuestion,
      },
    });

    if (!questionExists) {
      throw new HttpException(
        "Questions don´t no exists",
        HttpStatus.NOT_FOUND,
      );
    }

    const updateQuestion = await this.prismaService.questions.update({
      where: {
        id_question: idQuestion,
      },
      data: {
        question,
      },
      include: {
        answers: true,
        status: true,
        votes: {
          select: {
            vote: true,
            answer_id: true,
          },
        },
      },
    });

    return QuestionMapper.toDomainWithAnswer(updateQuestion);
  }
  async finalizedQuestion(
    idQuestion: string,
    idStatusQuestion: number,
  ): Promise<QuestionEntity> {
    const questionExists = await this.prismaService.questions.findFirst({
      where: {
        id_question: idQuestion,
      },
    });
    if (!questionExists) {
      throw new HttpException(
        "Questions don´t no exists",
        HttpStatus.NOT_FOUND,
      );
    }

    const updateQuestion = await this.prismaService.questions.update({
      where: {
        id_question: idQuestion,
      },
      data: {
        id_status_question: idStatusQuestion,
      },
      include: {
        answers: true,
        status: true,
        votes: {
          select: {
            vote: true,
            answer_id: true,
          },
        },
      },
    });

    return QuestionMapper.toDomainWithAnswer(updateQuestion);
  }
  async findAll(): Promise<QuestionEntity[]> {
    const response = await this.prismaService.questions.findMany({
      include: {
        answers: true,
        status: true,
        votes: {
          select: {
            vote: true,
            answer_id: true,
            question_id: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return Promise.all(
      response.map(async (question) => {
        const votesReduce = question.votes.reduce((acc, cur) => {
          const newVoteMapper = GeneralMapper.toReduce(cur);
          const { vote, idQuestion, idAnswer } = newVoteMapper;
          if (acc[idQuestion]) {
            acc[idQuestion] += vote;
          } else {
            acc[idQuestion] = vote;
          }
          return acc;
        }, {});

        const rowAnswer = await this.prismaService.answers.count({
          where: {
            question_id: question.id_question,
          },
        });

        return QuestionMapper.toDomainWithAnswerCount(
          question,
          rowAnswer,
          votesReduce[question.id_question],
        );
      }),
    );
  }
  async createQuestion(question: QuestionEntity): Promise<QuestionEntity> {
    const questionMapper = QuestionMapper.toPrisma(question);

    const response = await this.prismaService.questions.create({
      data: questionMapper,
      include: {
        answers: true,
        status: true,
        votes: {
          select: {
            vote: true,
            answer_id: true,
          },
        },
      },
    });
    return QuestionMapper.toDomainWithAnswer(response);
  }

  async deleteQuestion(id: string): Promise<void> {
    const questionExists = await this.prismaService.questions.findFirst({
      where: {
        id_question: id,
      },
    });
    if (!questionExists) {
      throw new HttpException(
        "Questions don´t no exists",
        HttpStatus.NOT_FOUND,
      );
    }

    await this.prismaService.answers.deleteMany({
      where: {
        question_id: id,
      },
    });

    await this.prismaService.questions.delete({
      where: {
        id_question: id,
      },
    });
  }

  async changeStatusQuestion(id: string): Promise<QuestionEntity> {
    let existsQuestion = await this.prismaService.questions.findFirst({
      where: {
        id_question: id,
      },
      include: {
        status: {
          select: {
            id_status_question: true,
            status_question: true,
          },
        },
      },
    });

    if (!existsQuestion) {
      throw new HttpException(
        "Questions don´t no exists",
        HttpStatus.NOT_FOUND,
      );
    }

    if (existsQuestion.status.id_status_question === StatusQuestionEnum.Ativa) {
      await this.prismaService.questions.update({
        where: {
          id_question: id,
        },
        data: {
          id_status_question: StatusQuestionEnum.Desativada,
        },
      });

      existsQuestion = await this.prismaService.questions.findFirst({
        where: {
          id_question: id,
        },
        include: {
          status: true,
        },
      });

      return QuestionMapper.toDomainWithStatus(existsQuestion);
    }

    await this.prismaService.questions.update({
      where: {
        id_question: id,
      },
      data: {
        id_status_question: StatusQuestionEnum.Ativa,
      },
    });

    existsQuestion = await this.prismaService.questions.findFirst({
      where: {
        id_question: id,
      },
      include: {
        status: true,
      },
    });

    return QuestionMapper.toDomainWithStatus(existsQuestion);
  }
}
