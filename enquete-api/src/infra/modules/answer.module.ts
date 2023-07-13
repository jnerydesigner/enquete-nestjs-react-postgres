import { AnswerService } from "@application/services/answer.service";
import { AnswerController } from "@controllers/answers/answer.controller";
import { Module } from "@nestjs/common";

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
