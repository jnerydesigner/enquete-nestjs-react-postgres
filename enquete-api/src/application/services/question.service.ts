import { ChangeStatusDTO } from "@application/DTOs/change-status.cto";
import { FinalizedDto } from "@application/DTOs/finalized.dto";
import { UpdateQuestionDto } from "@application/DTOs/update-question.dto";
import { QuestionPrismaRepositoryImplements } from "@data/prisma/repositories/implements/question-prisma-repository.implements";
import { QuestionEntity } from "@entities/question.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionRepository: QuestionPrismaRepositoryImplements,
  ) {}

  createQuestion(question: QuestionEntity) {
    return this.questionRepository.createQuestion(question);
  }

  findAll() {
    return this.questionRepository.findAll();
  }

  finalizedEnquete(request: FinalizedDto) {
    return this.questionRepository.finalizedQuestion(
      request.idQuestion,
      request.idStatusQuestion,
    );
  }

  updateQuestion(body: UpdateQuestionDto) {
    return this.questionRepository.updateQuestion(
      body.idQuestion,
      body.question,
    );
  }

  findQuestionById(id: string) {
    return this.questionRepository.findQuestionById(id);
  }

  deleteQuestion(id: string) {
    return this.questionRepository.deleteQuestion(id);
  }

  changeStatus(request: ChangeStatusDTO) {
    return this.questionRepository.changeStatusQuestion(request.idQuestion);
  }
}
