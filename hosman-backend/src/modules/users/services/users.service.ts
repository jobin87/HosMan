import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserProfileById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        userName: true,
        userEmail: true,
        role: true,
        department: true,
        specialization: true,
        isApproved: true,
        approvedBy: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException({
        success: false,
        message: 'User profile not found',
      });
    }

    return {
      success: true,
      user,
    };
  }

  async getAllUsers(currentUserRole?: string) {
    if (currentUserRole !== 'admin') {
      throw new ForbiddenException({
        success: false,
        message: 'Forbidden: Admin privilege required to view all users',
      });
    }

    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        userName: true,
        userEmail: true,
        userRegNum: true,
        role: true,
        isApproved: true,
        approvedBy: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      count: users.length,
      users,
    };
  }

  async setUserApproval(targetUserId: string, isApproved: boolean, currentUserRole: string) {
    if (currentUserRole !== 'admin') {
      throw new ForbiddenException({
        success: false,
        message: 'Forbidden: Admin privilege required to approve users',
      });
    }

    const user = await this.prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!user) {
      throw new NotFoundException({
        success: false,
        message: 'User not found',
      });
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: targetUserId },
      data: {
        isApproved: isApproved,
        approvedBy: isApproved ? 'Admin Approval' : null,
      },
      select: {
        id: true,
        userName: true,
        userEmail: true,
        userRegNum: true,
        role: true,
        isApproved: true,
        approvedBy: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      message: `User ${updatedUser.userName} has been ${updatedUser.isApproved ? 'approved' : 'unapproved'}.`,
      user: updatedUser,
    };
  }

  async deleteUserById(targetUserId: string, currentUserRole: string) {
    if (currentUserRole !== 'admin') {
      throw new ForbiddenException({
        success: false,
        message: 'Forbidden: Admin privilege required to delete users',
      });
    }

    const user = await this.prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!user) {
      throw new NotFoundException({
        success: false,
        message: 'User not found',
      });
    }

    await this.prisma.user.delete({
      where: { id: targetUserId },
    });

    return {
      success: true,
      message: `User ${targetUserId} deleted successfully`,
    };
  }
}
