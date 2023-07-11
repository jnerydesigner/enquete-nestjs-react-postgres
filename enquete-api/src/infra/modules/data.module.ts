import { PrismaService } from "@data/prisma/client/prisma.service";
import { UsersPrismaRepositoryImplements } from "@data/prisma/repositories/implements/users-prisma-repository.implements";
import { UsersPrismaRepository } from "@data/prisma/repositories/users-prisma.repository";
import { Global, Module } from "@nestjs/common";


@Global()
@Module({
    providers: [PrismaService, {
        provide: UsersPrismaRepositoryImplements,
        useClass: UsersPrismaRepository
    }],
    exports: [{
        provide: UsersPrismaRepositoryImplements,
        useClass: UsersPrismaRepository
    }]

})
export class DataModule { }