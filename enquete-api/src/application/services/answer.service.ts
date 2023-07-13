import { UpdateAnswerDto } from "@application/DTOs/udpate-answer.dto";
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
}
