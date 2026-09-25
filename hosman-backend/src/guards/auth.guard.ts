import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.config';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: string;
}

@Injectable()
export class SessionAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers?.authorization;
    
    const token =
      (authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null) || request.cookies?.authToken;

    if (!token) {
      throw new UnauthorizedException('Unauthorized: Access token is missing');
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || jwtConfig.secret,
      ) as {
        id: string;
        email: string;
        role: string;
      };

      if (!decoded || !decoded.id) {
        throw new UnauthorizedException('Unauthorized: Invalid token payload');
      }

      request.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role || 'user',
      } as AuthenticatedUser;

      return true;
    } catch (error: any) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Unauthorized: Invalid or expired token');
    }
  }
}
