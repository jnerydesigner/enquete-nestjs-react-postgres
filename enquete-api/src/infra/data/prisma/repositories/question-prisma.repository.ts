import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { QuestionEntity } from "@entities/question.entity";
import { QuestionPrismaRepositoryImplements } from "./implements/question-prisma-repository.implements";
import { PrismaService } from "../client/prisma.service";
import { QuestionMapper } from "../mapper/question.mapper";

@Injectable()
export class QuestionPrismaRepository
  implements QuestionPrismaRepositoryImplements {
  constructor(private readonly prismaService: PrismaService) { }
  async findQuestionById(id: string): Promise<QuestionEntity> {
    const questionExists = await this.prismaService.questions.findFirst({
      where: {
        id_question: id,
      },
      include: {
        answers: true,
        status: true,
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
      },
    });

    return QuestionMapper.toDomainWithAnswer(updateQuestion);
  }
  async findAll(): Promise<QuestionEntity[]> {
    const response = await this.prismaService.questions.findMany({
      include: {
        answers: true,
        status: true,
      },
    });

    return response.map((question) => {
      return QuestionMapper.toDomainWithAnswer(question);
    });
  }
  async createQuestion(question: QuestionEntity): Promise<QuestionEntity> {
    const questionMapper = QuestionMapper.toPrisma(question);

    const response = await this.prismaService.questions.create({
      data: questionMapper,
      include: {
        answers: true,
        status: true,
      },
    });
    return QuestionMapper.toDomainWithAnswer(response);
  }
}
