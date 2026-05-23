import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // Sajikan folder uploads sebagai file statis di /uploads
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });
  await app.listen(process.env.PORT || 3001);
  console.log(`Backend running on http://localhost:${process.env.PORT || 3001}`);
}
bootstrap();
