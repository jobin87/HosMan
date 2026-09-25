import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { SessionAuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { USERS_CONFIG } from './users.config';
import { handleError } from '../../utils/handle-error.util';

@UseGuards(SessionAuthGuard, RolesGuard)
@Controller(USERS_CONFIG.serviceName)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(USERS_CONFIG.endpoints.getMe)
  async getMyProfile(@Req() req: any) {
    return handleError(() => this.usersService.getUserProfileById(req.user.id));
  }

  @Get(USERS_CONFIG.endpoints.getAll)
  @Roles('admin')
  async getAllUsers(@Req() req: any) {
    return handleError(() => this.usersService.getAllUsers(req.user.role));
  }

  @Patch(USERS_CONFIG.endpoints.approveUser)
  @Roles('admin')
  async approveUser(@Req() req: any, @Param('id') id: string, @Body() body: { isApproved: boolean }) {
    return handleError(() => this.usersService.setUserApproval(id, body.isApproved, req.user.role));
  }

  @Delete(USERS_CONFIG.endpoints.deleteUser)
  @Roles('admin')
  async deleteUser(@Req() req: any, @Param('id') id: string) {
    return handleError(() => this.usersService.deleteUserById(id, req.user.role));
  }
}
