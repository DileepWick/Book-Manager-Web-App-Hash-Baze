import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.model';

@Injectable()
export class AuthService {
  // Inject JWT service
  constructor(private readonly jwtService: JwtService) {}

  // Generate JWT for a user
  generateToken(user: User): string {
    return this.jwtService.sign({ id: user.id, username: user.username });
  }

  // Verify JWT token
  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch {
      return null;
    }
  }
}
