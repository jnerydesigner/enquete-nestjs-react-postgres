import { StatusQuestionEnum } from "@application/enums/status-question.enum";
import { IsEnum, IsString } from "class-validator";

export class FinalizedDto {
  @IsString()
  idQuestion: string;

  @IsEnum(StatusQuestionEnum)
  idStatusQuestion: StatusQuestionEnum;
}
