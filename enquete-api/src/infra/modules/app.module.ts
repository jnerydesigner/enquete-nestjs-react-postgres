import { HelloController } from '@controllers/hello.controller';
import { Module } from '@nestjs/common';
import { DataModule } from './data.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DataModule, ConfigModule.forRoot()],
  controllers: [HelloController],
  providers: [],
})
export class AppModule { }
