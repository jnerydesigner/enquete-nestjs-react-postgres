import { CreateAuthorDto } from "@application/DTOs/create-author.dto";
import { IAuthor } from "@application/interfaces/author.interface";
import { AuthorsMapper } from "@data/prisma/mapper/authors.mapper";
import { UsersPrismaRepositoryImplements } from "@data/prisma/repositories/implements/users-prisma-repository.implements";
import { Injectable } from "@nestjs/common";
import * as crypto from "node:crypto";

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersPrismaRepositoryImplements,
  ) {}
  createUser(body: CreateAuthorDto) {
    const request: IAuthor = {
      idAuthor: crypto.randomUUID(),
      ...body,
    };
    const mapperToDomain = AuthorsMapper.toDomainWithInterface(request);
    return this.usersRepository.createAuthor(mapperToDomain);
  }
}
