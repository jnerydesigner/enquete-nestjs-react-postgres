import { IsString } from "class-validator";

export class CreateAuthorDto {
  @IsString()
  nameAuthor: string;

  @IsString()
  emailAuthor: string;
}
