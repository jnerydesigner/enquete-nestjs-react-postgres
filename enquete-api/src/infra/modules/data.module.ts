import { PrismaService } from "@data/prisma/client/prisma.service";
import { Global, Module } from "@nestjs/common";


@Global()
@Module({
    providers: [PrismaService]
})
export class DataModule { }