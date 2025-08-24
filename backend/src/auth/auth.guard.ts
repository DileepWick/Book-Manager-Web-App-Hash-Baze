import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    const token = ctx.req?.cookies?.jwt; // <-- read token from HttpOnly cookie

    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    const user = this.authService.verifyToken(token);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    // attach the user to request so resolver can access it
    ctx.req.user = user;

    return true;
  }
}
