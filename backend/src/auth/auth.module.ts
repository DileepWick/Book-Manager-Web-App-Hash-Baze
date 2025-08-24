import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { GqlAuthGuard } from './auth.guard';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config(); 

// Ensure JWT secret exists
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

// Ensure JWT expiration is set, default to 1 hour if not defined
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '3600s'; // default 1 hour

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRATION },
    }),
  ],
  providers: [AuthService, AuthResolver, GqlAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
