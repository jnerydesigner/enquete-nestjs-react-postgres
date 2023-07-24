import { IsString } from "class-validator";

export class ChangeStatusDTO {
  @IsString()
  idQuestion: string;
}
