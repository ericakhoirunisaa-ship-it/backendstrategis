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
  const allowedOrigins = [
    'http://localhost:3000',
    process.env.FRONTEND_URL,
  ].filter(Boolean) as string[];
  app.enableCors({
    origin: (origin, callback) => {
      // allow requests with no origin (mobile, curl, server-side)
      if (!origin) return callback(null, true);
      if (allowedOrigins.some((o) => origin.startsWith(o))) return callback(null, true);
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  });
  await app.listen(process.env.PORT || 3001);
  console.log(`Backend running on http://localhost:${process.env.PORT || 3001}`);
}
bootstrap();
