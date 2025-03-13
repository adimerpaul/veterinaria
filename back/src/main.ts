import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
async function bootstrap() {
  process.env.TZ = 'America/La_Paz';
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Activa la transformación de class-transformer
    }),
  );
  console.log(`listening on port http://localhost:${process.env.PORT ?? 3000}`);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
