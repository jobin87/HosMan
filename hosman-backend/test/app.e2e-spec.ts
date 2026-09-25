import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('API Integration & Security E2E Tests', () => {
  let app: INestApplication;

  const mockPrisma = {
    $connect: jest.fn(),
    $disconnect: jest.fn(),
    user: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
    task: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('API Test 1: GET / should return server status 200 OK', async () => {
    const response = await request(app.getHttpServer()).get('/');
    expect(response.status).toBe(200);
  });

  it('API Test 2: POST /tasks should return 401 Unauthorized when no JWT token is supplied', async () => {
    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send({ title: 'Unauthenticated Task Test' });

    expect(response.status).toBe(401);
  });

  it('API Test 3: POST /auth/register should return 400 Bad Request on invalid email format', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        userName: 'TestUser',
        userEmail: 'invalid-email-string',
        password: 'password123',
      });

    expect(response.status).toBe(400);
  });

  it('API Test 4: GET /users should return 401 Unauthorized when unauthenticated', async () => {
    const response = await request(app.getHttpServer()).get('/users');
    expect(response.status).toBe(401);
  });
});
