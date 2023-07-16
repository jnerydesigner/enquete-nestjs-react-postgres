import { AnswerService } from "@application/services/answer.service";
import { AnswerController } from "@controllers/answers/answer.controller";
import { Logger, Module } from "@nestjs/common";

@Module({
  controllers: [AnswerController],
  providers: [AnswerService, Logger],
})
export class AnswerModule {}
