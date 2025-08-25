import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    // Create gql context
    const ctx = GqlExecutionContext.create(context).getContext();

    // Get the token from context
    const token = ctx.req?.cookies?.jwt; // <-- read token from HttpOnly cookie

    // If no token, throw error
    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    // Verify token
    const user = this.authService.verifyToken(token);

    // If invalid token, throw error
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    // attach the user to request so resolver can access it
    ctx.req.user = user;

    return true;
  }
}
