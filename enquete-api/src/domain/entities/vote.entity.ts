import { IVotes } from "@application/interfaces/vote.interface";

export class VoteEntity {
  idVote: number | null;
  vote: number;
  idQuestion?: string;
  idAnswer?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(vote: IVotes) {
    this.idVote = vote.idVote;
    this.vote = vote.vote;
    this.idQuestion = vote.idQuestion;
    this.idAnswer = vote.idAnswer;
    this.createdAt = vote.createdAt;
    this.updatedAt = vote.updatedAt;
  }
}
