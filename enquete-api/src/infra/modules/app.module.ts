import { HelloController } from '@controllers/hello.controller';
import { Module } from '@nestjs/common';
import { DataModule } from './data.module';
import { ConfigModule } from '@nestjs/config';
import { HealthCheckModule } from './health-check.module';

@Module({
  imports: [DataModule, ConfigModule.forRoot(), HealthCheckModule],
  controllers: [HelloController],
  providers: [],
})
export class AppModule { }
