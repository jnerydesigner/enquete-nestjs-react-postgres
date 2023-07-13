import { CreateAnswerDto } from "@application/DTOs/create-answer.dto";
import { UpdateAnswerDto } from "@application/DTOs/udpate-answer.dto";
import { AnswerService } from "@application/services/answer.service";
import { AnswerMapper } from "@data/prisma/mapper/answer.mapper";
import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";

@Controller("answers")
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}
  @Post()
  createAnswer(@Body() body: CreateAnswerDto) {
    const answerMapper = AnswerMapper.toDomainBackDTO(body);
    return this.answerService.createAnswer(answerMapper);
  }

  @Get()
  findAll() {
    return this.answerService.findAll();
  }

  @Get("/:id/findone")
  findOne(@Param("id") id: string) {
    return this.answerService.findAnswerById(id);
  }

  @Put(":id/update")
  updateAnswer(@Param("id") id: string, @Body() body: UpdateAnswerDto) {
    return this.answerService.updateAnswer(id, body);
  }
}
