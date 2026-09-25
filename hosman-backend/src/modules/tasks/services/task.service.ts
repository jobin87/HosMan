import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(userId: string, dto: CreateTaskDto) {
    const targetUserId = dto.userId || userId;
    const task = await this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description || null,
        status: dto.status || 'todo',
        userId: targetUserId,
      },
      include: {
        user: {
          select: {
            id: true,
            userName: true,
            userEmail: true,
            role: true,
          },
        },
      },
    });

    return {
      success: true,
      message: 'Task created successfully',
      task,
    };
  }

  async getUserTasks(
    userId: string,
    currentUserRole: string,
    query?: { page?: number; limit?: number; status?: string; scope?: string; search?: string },
  ) {
    const userInclude = {
      user: {
        select: {
          id: true,
          userName: true,
          userEmail: true,
          role: true,
        },
      },
    };

    const where: any = {};

    if (currentUserRole !== 'admin') {
      where.userId = userId;
    } else if (query?.scope && query.scope !== 'all') {
      if (query.scope === 'my') {
        where.userId = userId;
      } else {
        where.userId = query.scope;
      }
    }

    if (query?.status && query.status !== 'all') {
      where.status = query.status;
    }

    if (query?.search && query.search.trim()) {
      const searchTerm = query.search.trim();
      where.OR = [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    const totalCount = await this.prisma.task.count({ where });

    const page = query?.page && query.page > 0 ? query.page : undefined;
    const limit = query?.limit && query.limit > 0 ? query.limit : undefined;

    let tasks;
    if (page && limit) {
      tasks = await this.prisma.task.findMany({
        where,
        include: userInclude,
        orderBy: { created_at: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      });
    } else {
      tasks = await this.prisma.task.findMany({
        where,
        include: userInclude,
        orderBy: { created_at: 'desc' },
      });
    }

    return {
      success: true,
      count: totalCount,
      totalCount,
      page: page || 1,
      limit: limit || totalCount,
      totalPages: limit ? Math.max(1, Math.ceil(totalCount / limit)) : 1,
      tasks,
    };
  }

  async getTaskById(taskId: string, userId: string, currentUserRole: string) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: {
        user: {
          select: {
            id: true,
            userName: true,
            userEmail: true,
            role: true,
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException({
        success: false,
        message: 'Task not found',
      });
    }

    if (currentUserRole !== 'admin' && task.userId !== userId) {
      throw new ForbiddenException({
        success: false,
        message: 'Forbidden: Access denied to this task',
      });
    }

    return {
      success: true,
      task,
    };
  }

  async updateTaskById(
    taskId: string,
    userId: string,
    options: { role: string; dto: UpdateTaskDto },
  ) {
    const taskResponse = await this.getTaskById(taskId, userId, options.role);
    const existingTask = taskResponse.task;

    const updatedTask = await this.prisma.task.update({
      where: { id: existingTask.id },
      data: {
        ...(options.dto.title !== undefined && { title: options.dto.title }),
        ...(options.dto.description !== undefined && { description: options.dto.description }),
        ...(options.dto.status !== undefined && { status: options.dto.status }),
        ...(options.dto.userId !== undefined && { userId: options.dto.userId }),
      },
      include: {
        user: {
          select: {
            id: true,
            userName: true,
            userEmail: true,
            role: true,
          },
        },
      },
    });

    return {
      success: true,
      message: 'Task updated successfully',
      task: updatedTask,
    };
  }

  async deleteTaskById(taskId: string, userId: string, currentUserRole: string) {
    const taskResponse = await this.getTaskById(taskId, userId, currentUserRole);
    const existingTask = taskResponse.task;

    await this.prisma.task.delete({
      where: { id: existingTask.id },
    });

    return {
      success: true,
      message: 'Task deleted successfully',
    };
  }
}
