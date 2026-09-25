import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

describe('TaskService Unit Tests', () => {
  let service: TaskService;
  let mockPrisma: any;

  beforeEach(async () => {
    mockPrisma = {
      task: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('Unit Test 1: should create a new task successfully', async () => {
    const mockTask = {
      id: 'task-1',
      title: 'Test Task',
      description: 'Description',
      status: 'todo',
      userId: 'user-1',
      created_at: new Date(),
      updated_at: new Date(),
    };

    mockPrisma.task.create.mockResolvedValue(mockTask);

    const result = await service.createTask('user-1', {
      title: 'Test Task',
      description: 'Description',
    });

    expect(result.success).toBe(true);
    expect(result.task).toEqual(mockTask);
    expect(mockPrisma.task.create).toHaveBeenCalledWith({
      data: {
        title: 'Test Task',
        description: 'Description',
        status: 'todo',
        userId: 'user-1',
      },
    });
  });

  it('Unit Test 2: should return only user tasks for normal user and all tasks for admin', async () => {
    const mockTasksUser = [{ id: 'task-1', userId: 'user-1' }];
    const mockTasksAdmin = [
      { id: 'task-1', userId: 'user-1' },
      { id: 'task-2', userId: 'user-2' },
    ];

    mockPrisma.task.findMany.mockResolvedValueOnce(mockTasksUser);
    const userTasks = await service.getUserTasks('user-1', 'user');
    expect(userTasks.tasks).toEqual(mockTasksUser);

    mockPrisma.task.findMany.mockResolvedValueOnce(mockTasksAdmin);
    const adminTasks = await service.getUserTasks('user-admin', 'admin');
    expect(adminTasks.tasks).toEqual(mockTasksAdmin);
  });

  it('Unit Test 3: should throw ForbiddenException when user accesses another user task', async () => {
    mockPrisma.task.findUnique.mockResolvedValue({
      id: 'task-99',
      userId: 'user-2',
    });

    await expect(
      service.getTaskById('task-99', 'user-1', 'user'),
    ).rejects.toThrow(ForbiddenException);
  });

  it('Unit Test 4: should throw NotFoundException when task does not exist', async () => {
    mockPrisma.task.findUnique.mockResolvedValue(null);

    await expect(
      service.getTaskById('non-existent', 'user-1', 'user'),
    ).rejects.toThrow(NotFoundException);
  });
});
