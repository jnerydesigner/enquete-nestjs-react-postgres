import { CreateVoteDto } from "@application/DTOs/create-vote.dto";
import { UpdateAnswerDto } from "@application/DTOs/udpate-answer.dto";
import { IVotes } from "@application/interfaces/vote.interface";
import { VoteMapper } from "@data/prisma/mapper/vote.mapper";
import { AnswerPrismaRepositoryImplements } from "@data/prisma/repositories/implements/answer-prisma-repository.implements";
import { AnswerEntity } from "@entities/answer.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AnswerService {
  constructor(
    private readonly answerRepository: AnswerPrismaRepositoryImplements,
  ) {}

  createAnswer(answer: AnswerEntity) {
    return this.answerRepository.createAnswer(answer);
  }

  findAll() {
    return this.answerRepository.findAll();
  }

  updateAnswer(id: string, body: UpdateAnswerDto) {
    return this.answerRepository.updateAnswer(id, body.answer);
  }

  findAnswerById(id: string) {
    return this.answerRepository.findAnswerById(id);
  }

  deleteAnswer(id: string) {
    return this.answerRepository.deleteAnswer(id);
  }

  voteAnswer(vote: CreateVoteDto) {
    const obj: IVotes = {
      ...vote,
    };
    const voteMapper = VoteMapper.toDomainWithInterface(obj);
    return this.answerRepository.voteAnswer(voteMapper);
  }
}
