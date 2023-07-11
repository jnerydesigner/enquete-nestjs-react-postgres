import { IAuthor } from "@application/interfaces/author.interface";


export class AuthorEntity {
    private idAuthor: string | null;
    private nameAuthor: string;
    private emailAuthor: string;
    private createdAt?: Date;
    private updatedAt?: Date;
    constructor(author: IAuthor) {
        this.setIdAuthor = author.idAuthor
        this.setNameAuthor = author.nameAuthor
        this.setEmailAuthor = author.emailAuthor
        this.setCreatedAt = author.createdAt
        this.setUpdatedAt = author.updatedAt
    }

    get getIdAuthor(): string | null {
        return this.idAuthor
    }

    set setIdAuthor(value: string) {
        this.idAuthor = value
    }

    get getNameAuthor(): string {
        return this.nameAuthor
    }

    set setNameAuthor(value: string) {
        this.nameAuthor = value
    }

    get getEmailAuthor(): string {
        return this.emailAuthor
    }

    set setEmailAuthor(value: string) {
        this.emailAuthor = value
    }

    get getCreatedAt(): Date {
        return this.createdAt
    }

    set setCreatedAt(value: Date) {
        this.createdAt = value
    }

    get getUpdatedAt(): Date {
        return this.updatedAt
    }

    set setUpdatedAt(value: Date) {
        this.updatedAt = value
    }
}