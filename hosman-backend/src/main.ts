import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const allowedOrigins = [
    'http://localhost:5173',
    'https://hosman-beta.netlify.app',
  ];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.get('/', (req, res) => {
    res.send('Hello, WebSocket & HosMan NestJS API is working!');
  });

  const PORT = process.env.PORT || 5001;
  await app.listen(PORT, '0.0.0.0');
  console.log(`NestJS server is running on http://localhost:${PORT}`);
}

bootstrap();
