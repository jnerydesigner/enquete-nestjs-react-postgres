import { IsString } from "class-validator";

export class CreateVoteDto {
  @IsString()
  idQuestion: string;
  @IsString()
  idAnswer: string;
}
