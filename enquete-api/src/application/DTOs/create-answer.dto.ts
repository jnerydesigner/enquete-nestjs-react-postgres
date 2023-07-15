import { IsString } from "class-validator";

export class CreateAnswerDto {
  @IsString()
  idQuestion: string;
  answer: string;
}
