import { AnswerEntity } from "@entities/answer.entity";
import { VoteEntity } from "@entities/vote.entity";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";

import { PrismaService } from "../client/prisma.service";
import { AnswerMapper } from "../mapper/answer.mapper";
import { VoteMapper } from "../mapper/vote.mapper";
import { AnswerPrismaRepositoryImplements } from "./implements/answer-prisma-repository.implements";

@Injectable()
export class AnswerPrismaRepository
  implements AnswerPrismaRepositoryImplements
{
  constructor(
    private readonly prismaService: PrismaService,
    private logger: Logger,
  ) {}

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

    const votes = await this.prismaService.votes.findFirst({
      where: {
        answer_id: findAnswer.id_answer,
        question_id: findAnswer.question_id,
      },
    });

    return AnswerMapper.toDomainNotDate(findAnswer, votes.vote);
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

    return AnswerMapper.toDomainNotDate(updateAnswer);
  }
  async findAll(): Promise<AnswerEntity[]> {
    const find = await this.prismaService.answers.findMany({
      include: {
        Questions: true,
        Votes: {
          select: {
            answer_id: true,
            question_id: true,
            vote: true,
          },
        },
      },
    });

    this.logger.log(find);

    return Promise.all(
      find.map(async (answer) => {
        return AnswerMapper.toDomainWithQuestion(answer);
      }),
    );
  }
  async createAnswer(answer: AnswerEntity): Promise<AnswerEntity> {
    const answerToPrisma = AnswerMapper.toPrisma(answer);

    const response = await this.prismaService.answers.create({
      data: answerToPrisma,
    });
    const responseVotes = await this.prismaService.votes.create({
      data: {
        answer_id: answerToPrisma.id_answer,
        question_id: answerToPrisma.question_id,
        vote: 0,
      },
    });

    return AnswerMapper.toDomainNotDate(response, responseVotes.vote);
  }

  async deleteAnswer(id: string): Promise<void> {
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

    await this.prismaService.answers.delete({
      where: {
        id_answer: id,
      },
    });
  }

  async voteAnswer(vote: VoteEntity): Promise<VoteEntity> {
    let voteExists = await this.prismaService.votes.findFirst({
      where: {
        answer_id: vote.idAnswer,
        question_id: vote.idQuestion,
      },
    });

    if (!voteExists) {
      await this.prismaService.votes.create({
        data: {
          vote: 1,
          answer_id: vote.idAnswer,
          question_id: vote.idQuestion,
        },
      });
    } else {
      await this.prismaService.votes.update({
        where: {
          id_vote: voteExists.id_vote,
        },
        data: {
          vote: voteExists.vote + 1,
        },
      });
    }

    voteExists = await this.prismaService.votes.findFirst({
      where: {
        answer_id: vote.idAnswer,
        question_id: vote.idQuestion,
      },
    });

    return VoteMapper.toDomain(voteExists);
  }
}
