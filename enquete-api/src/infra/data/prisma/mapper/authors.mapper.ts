import { IAuthor } from "@application/interfaces/author.interface";
import { AuthorEntity } from "@entities/author.entity";
import { Author as RawAuthor } from "@prisma/client";

export class AuthorsMapper {
  static toPrisma(author: AuthorEntity): RawAuthor {
    return {
      id_author: author.getIdAuthor,
      name_author: author.getNameAuthor,
      email_author: author.getEmailAuthor,
      created_at: author.getCreatedAt,
      updated_at: author.getUpdatedAt,
    };
  }

  static toDomain(author: RawAuthor): AuthorEntity {
    return new AuthorEntity({
      idAuthor: author.id_author,
      nameAuthor: author.name_author,
      emailAuthor: author.email_author,
      createdAt: author.created_at,
      updatedAt: author.updated_at,
    });
  }

  static toDomainWithInterface(author: IAuthor): AuthorEntity {
    return new AuthorEntity({
      idAuthor: author.idAuthor,
      nameAuthor: author.nameAuthor,
      emailAuthor: author.emailAuthor,
    });
  }
}
