import { Injectable } from "@nestjs/common";
import { AuthorEntity } from "@entities/author.entity";
import { UsersPrismaRepositoryImplements } from "./implements/users-prisma-repository.implements";
import { PrismaService } from "../client/prisma.service";
import { AuthorsMapper } from "../mapper/authors.mapper";

@Injectable()
export class UsersPrismaRepository implements UsersPrismaRepositoryImplements {
  constructor(private readonly prismaService: PrismaService) {}
  async createAuthor(author: AuthorEntity): Promise<AuthorEntity> {
    const response = await this.prismaService.author.create({
      data: AuthorsMapper.toPrisma(author),
    });

    return AuthorsMapper.toDomain(response);
  }
}
