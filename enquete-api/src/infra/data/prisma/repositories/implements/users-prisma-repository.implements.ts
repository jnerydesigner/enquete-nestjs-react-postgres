import { AuthorEntity } from "@entities/author.entity";

export abstract class UsersPrismaRepositoryImplements {
  abstract createAuthor(body: AuthorEntity): Promise<AuthorEntity>;
}
