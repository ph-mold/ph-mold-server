// src/guards/roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Request } from 'express';
import { AuthPayload } from 'src/modules/admin/auth/auth.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as AuthPayload | undefined;

    if (!user || !user.role) {
      throw new ForbiddenException('로그인된 사용자만 접근할 수 있습니다.');
    }

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('권한이 없습니다.');
    }

    return true;
  }
}
