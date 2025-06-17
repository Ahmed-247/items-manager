import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // auto-transform payloads to DTO instances
      whitelist: true, // remove properties not in the DTO
      forbidNonWhitelisted: true, // throw error on extra properties
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
