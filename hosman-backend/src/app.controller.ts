import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHealthStatus() {
    return {
      status: 'ok',
      message: 'User Management & Task Tracker API is running successfully',
    };
  }
}
