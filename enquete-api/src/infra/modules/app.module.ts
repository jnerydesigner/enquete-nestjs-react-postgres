import { HelloController } from "@controllers/hello.controller";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DataModule } from "./data.module";
import { HealthCheckModule } from "./health-check.module";
import { UsersModule } from "./users.module";
import { QuestionModule } from "./question.module";
import { AnswerModule } from "./answer.module";

@Module({
  imports: [
    DataModule,
    ConfigModule.forRoot(),
    HealthCheckModule,
    UsersModule,
    QuestionModule,
    AnswerModule,
  ],
  controllers: [HelloController],
  providers: [],
})
export class AppModule {}
