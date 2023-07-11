import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/modules/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
    }),
  );
  await app.listen(3000);
}
bootstrap();
