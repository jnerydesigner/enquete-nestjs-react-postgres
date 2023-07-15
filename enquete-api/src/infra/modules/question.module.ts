import { QuestionService } from "@application/services/question.service";
import { QuestionController } from "@controllers/questions/question.controller";
import { Module } from "@nestjs/common";

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
