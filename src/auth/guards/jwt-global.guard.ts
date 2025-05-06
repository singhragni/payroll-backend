import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtGuard } from './jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { isObservable, lastValueFrom } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorators';

@Injectable()
export class JwtGlobalGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // ✅ Check if route is marked as @Public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),   
    ]);

    if (isPublic) {
      return true; // Skip guard if route is public
    }

    const jwtAuthGuard = new JwtGuard();
    const result = jwtAuthGuard.canActivate(context);

    if (isObservable(result)) {
      return await lastValueFrom(result);
    } else {
      return result;
    }
  }
}
