import { IsString } from "class-validator";

export class UpdateQuestionDto {
  @IsString()
  idQuestion: string;

  @IsString()
  question: string;
}
