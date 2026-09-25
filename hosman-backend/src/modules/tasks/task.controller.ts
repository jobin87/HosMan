import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TaskService } from './services/task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SessionAuthGuard } from '../../guards/auth.guard';
import { TASK_CONFIG } from './task.config';
import { handleError } from '../../utils/handle-error.util';

@UseGuards(SessionAuthGuard)
@Controller(TASK_CONFIG.serviceName)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(TASK_CONFIG.endpoints.create)
  @HttpCode(HttpStatus.CREATED)
  async createTask(@Req() req: any, @Body() dto: CreateTaskDto) {
    return handleError(() => this.taskService.createTask(req.user.id, dto, req.user.role));
  }

  @Get(TASK_CONFIG.endpoints.getAll)
  async getTasks(
    @Req() req: any,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
    @Query('scope') scope?: string,
    @Query('search') search?: string,
  ) {
    return handleError(() =>
      this.taskService.getUserTasks(req.user.id, req.user.role, {
        page: page ? parseInt(page, 10) : undefined,
        limit: limit ? parseInt(limit, 10) : undefined,
        status,
        scope,
        search,
      }),
    );
  }

  @Get(TASK_CONFIG.endpoints.getOne)
  async getTaskById(@Req() req: any, @Param('id') id: string) {
    return handleError(() =>
      this.taskService.getTaskById(id, req.user.id, req.user.role),
    );
  }

  @Put(TASK_CONFIG.endpoints.update)
  async updateTask(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return handleError(() =>
      this.taskService.updateTaskById(id, req.user.id, {
        role: req.user.role,
        dto,
      }),
    );
  }

  @Delete(TASK_CONFIG.endpoints.delete)
  async deleteTask(@Req() req: any, @Param('id') id: string) {
    return handleError(() =>
      this.taskService.deleteTaskById(id, req.user.id, req.user.role),
    );
  }
}
