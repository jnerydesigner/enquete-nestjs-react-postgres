import { IVotes } from "@application/interfaces/vote.interface";
import { VoteEntity } from "@entities/vote.entity";
import { Votes as RawVotes } from "@prisma/client";

export class VoteMapper {
  static toDomain(vote: RawVotes): VoteEntity {
    return new VoteEntity({
      idVote: vote.id_vote,
      idQuestion: vote.question_id,
      idAnswer: vote.answer_id,
      vote: vote.vote,
    });
  }

  static toDomainWithInterface(vote: IVotes): VoteEntity {
    return new VoteEntity({
      idVote: vote.idVote,
      idQuestion: vote.idQuestion,
      idAnswer: vote.idAnswer,
      vote: vote.vote,
      createdAt: vote.createdAt,
      updatedAt: vote.updatedAt,
    });
  }
}
