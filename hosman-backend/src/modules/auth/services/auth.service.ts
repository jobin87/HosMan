import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { RegisterRequestDto } from '../dto/register-request.dto';
import { LoginRequestDto } from '../dto/login-request.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { jwtConfig } from '../../../config/jwt.config';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async registerUser(dto: RegisterRequestDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { userEmail: dto.userEmail },
    });

    if (existingUser) {
      throw new BadRequestException({
        success: false,
        message: 'User with this email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const role = dto.role || 'user';
    const approvedBy = dto.approvedBy || (role === 'admin' ? 'Super Admin' : 'System Admin');

    const newUser = await this.prisma.user.create({
      data: {
        userName: dto.userName,
        userEmail: dto.userEmail,
        password: hashedPassword,
        role: role,
        userRegNum: dto.userRegNum || '',
        isApproved: true,
        approvedBy: approvedBy,
        isVerified: true,
      },
    });

    return {
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        userName: newUser.userName,
        userEmail: newUser.userEmail,
        userRegNum: newUser.userRegNum,
        role: newUser.role,
        isApproved: newUser.isApproved,
        approvedBy: newUser.approvedBy,
        createdAt: newUser.createdAt,
      },
    };
  }

  async loginUser(dto: LoginRequestDto) {
    const user = await this.prisma.user.findUnique({
      where: { userEmail: dto.userEmail },
    });

    if (!user) {
      throw new UnauthorizedException({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException({
        success: false,
        message: 'Invalid email or password',
      });
    }

    if (user.isApproved === false) {
      throw new UnauthorizedException({
        success: false,
        message: 'Your registration request is pending admin approval. Please wait for an admin to approve your account before logging in.',
      });
    }

    const secret = process.env.JWT_SECRET || jwtConfig.secret;
    const token = jwt.sign(
      { id: user.id, email: user.userEmail, role: user.role },
      secret,
      { expiresIn: '24h' },
    );

    return {
      success: true,
      message: 'Login successful',
      accessToken: token,
      user: {
        id: user.id,
        userName: user.userName,
        userEmail: user.userEmail,
        userRegNum: user.userRegNum,
        role: user.role,
        isApproved: user.isApproved,
        approvedBy: user.approvedBy,
      },
    };
  }
}
