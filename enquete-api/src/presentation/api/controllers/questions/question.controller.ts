import { CreateQuestionDto } from "@application/DTOs/create-question.dto";
import { FinalizedDto } from "@application/DTOs/finalized.dto";
import { UpdateQuestionDto } from "@application/DTOs/update-question.dto";
import { QuestionService } from "@application/services/question.service";
import { QuestionMapper } from "@data/prisma/mapper/question.mapper";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";

@Controller("questions")
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @Post()
  createQuestion(@Body() body: CreateQuestionDto) {
    const mapperQuestionEntity = QuestionMapper.toDomainBackDTO(body);
    return this.questionService.createQuestion(mapperQuestionEntity);
  }

  @Get("findall")
  findAll() {
    return this.questionService.findAll();
  }

  @Get("/:id/findone")
  findOne(@Param("id") id: string) {
    return this.questionService.findQuestionById(id);
  }

  @Put("/finalized-enquete")
  finalizedEnquete(@Body() body: FinalizedDto) {
    return this.questionService.finalizedEnquete(body);
  }

  @Put("/update-enquete")
  updateEnquete(@Body() body: UpdateQuestionDto) {
    return this.questionService.updateQuestion(body);
  }

  @Delete(":id/delete")
  deleteQuestion(@Param("id") id: string) {
    return this.questionService.deleteQuestion(id);
  }
}
