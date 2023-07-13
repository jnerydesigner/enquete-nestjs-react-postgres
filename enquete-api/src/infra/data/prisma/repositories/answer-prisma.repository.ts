import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AnswerEntity } from "@entities/answer.entity";
import { AnswerPrismaRepositoryImplements } from "./implements/answer-prisma-repository.implements";
import { AnswerMapper } from "../mapper/answer.mapper";
import { PrismaService } from "../client/prisma.service";

@Injectable()
export class AnswerPrismaRepository
  implements AnswerPrismaRepositoryImplements
{
  constructor(private readonly prismaService: PrismaService) {}
  async findAnswerById(id: string): Promise<AnswerEntity> {
    const findAnswer = await this.prismaService.answers.findFirst({
      where: {
        id_answer: id,
      },
    });

    if (!findAnswer) {
      throw new HttpException(
        "Questions don´t no exists",
        HttpStatus.NOT_FOUND,
      );
    }

    return AnswerMapper.toDomain(findAnswer);
  }
  async updateAnswer(id: string, answer: string): Promise<AnswerEntity> {
    const updateAnswer = await this.prismaService.answers.update({
      where: {
        id_answer: id,
      },
      data: {
        answer,
      },
    });

    return AnswerMapper.toDomain(updateAnswer);
  }
  async findAll(): Promise<AnswerEntity[]> {
    const find = await this.prismaService.answers.findMany({
      include: {
        Questions: true,
      },
    });

    return find.map((answer) => {
      return AnswerMapper.toDomainWithQuestion(answer);
    });
  }
  async createAnswer(answer: AnswerEntity): Promise<AnswerEntity> {
    const answerToPrisma = AnswerMapper.toPrisma(answer);

    const response = await this.prismaService.answers.create({
      data: answerToPrisma,
    });

    return AnswerMapper.toDomain(response);
  }
}
