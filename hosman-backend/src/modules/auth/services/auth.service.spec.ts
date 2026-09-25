import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

describe('AuthService Unit Tests', () => {
  let service: AuthService;
  let mockPrisma: any;

  beforeEach(async () => {
    mockPrisma = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('Unit Test 1: should reject registration when user email already exists', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ id: 'u-1', userEmail: 'existing@example.com' });

    await expect(
      service.registerUser({
        userName: 'John',
        userEmail: 'existing@example.com',
        password: 'password123',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('Unit Test 2: should hash password during successful registration', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);
    mockPrisma.user.create.mockImplementation((args: any) => {
      return Promise.resolve({
        id: 'u-1',
        userName: args.data.userName,
        userEmail: args.data.userEmail,
        password: args.data.password,
        role: args.data.role,
        createdAt: new Date(),
      });
    });

    const result = await service.registerUser({
      userName: 'Alice',
      userEmail: 'alice@example.com',
      password: 'securepassword',
    });

    expect(result.success).toBe(true);
    expect(result.user.userEmail).toBe('alice@example.com');
    expect(mockPrisma.user.create).toHaveBeenCalled();
    const createdData = mockPrisma.user.create.mock.calls[0][0].data;
    expect(createdData.password).not.toBe('securepassword');
    expect(await bcrypt.compare('securepassword', createdData.password)).toBe(true);
  });

  it('Unit Test 3: should reject login when user is not found', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);

    await expect(
      service.loginUser({
        userEmail: 'nonexistent@example.com',
        password: 'password123',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
