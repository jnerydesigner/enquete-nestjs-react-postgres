import { PrismaService } from "@data/prisma/client/prisma.service";
import { AnswerPrismaRepository } from "@data/prisma/repositories/answer-prisma.repository";
import { AnswerPrismaRepositoryImplements } from "@data/prisma/repositories/implements/answer-prisma-repository.implements";
import { QuestionPrismaRepositoryImplements } from "@data/prisma/repositories/implements/question-prisma-repository.implements";
import { UsersPrismaRepositoryImplements } from "@data/prisma/repositories/implements/users-prisma-repository.implements";
import { QuestionPrismaRepository } from "@data/prisma/repositories/question-prisma.repository";
import { UsersPrismaRepository } from "@data/prisma/repositories/users-prisma.repository";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: UsersPrismaRepositoryImplements,
      useClass: UsersPrismaRepository,
    },
    {
      provide: QuestionPrismaRepositoryImplements,
      useClass: QuestionPrismaRepository,
    },
    {
      provide: AnswerPrismaRepositoryImplements,
      useClass: AnswerPrismaRepository,
    },
  ],
  exports: [
    {
      provide: UsersPrismaRepositoryImplements,
      useClass: UsersPrismaRepository,
    },
    {
      provide: QuestionPrismaRepositoryImplements,
      useClass: QuestionPrismaRepository,
    },
    {
      provide: AnswerPrismaRepositoryImplements,
      useClass: AnswerPrismaRepository,
    },
  ],
})
export class DataModule {}
