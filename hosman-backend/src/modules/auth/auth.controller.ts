import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { AUTH_CONFIG } from './auth.config';
import { handleError } from '../../utils/handle-error.util';

@Controller(AUTH_CONFIG.serviceName)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AUTH_CONFIG.endpoints.register)
  @HttpCode(HttpStatus.CREATED)
  async registerUser(@Body() dto: RegisterRequestDto) {
    return handleError(() => this.authService.registerUser(dto));
  }

  @Post(AUTH_CONFIG.endpoints.login)
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() dto: LoginRequestDto) {
    return handleError(() => this.authService.loginUser(dto));
  }
}
