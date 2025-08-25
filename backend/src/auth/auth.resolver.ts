import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User, RegisterInput, LoginInput } from '../user/user.model';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class AuthResolver {

  // Inject services
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // Register a new user
  @Mutation(() => User)
  @UsePipes(new ValidationPipe())
  async register(@Args('input') input: RegisterInput): Promise<User> {
    return this.userService.register(input);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard) // ensure user is authenticated
  async me(@Context() context: any): Promise<User> {
    const user = context.req.user; // set by your JWT guard
    return user;
  }

  // Login 
  @Mutation(() => Boolean)
  @UsePipes(new ValidationPipe())
  async login(
    @Args('input') input: LoginInput,
    @Context() context: any, // gives access to req & res
  ): Promise<boolean> {
    const user = await this.userService.validateUser(
      input.username,
      input.password,
    );
    if (!user) throw new Error('Invalid credentials');

    const token = this.authService.generateToken(user);

    // Set HttpOnly cookie
    context.res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    return true; // just indicate success
  }


  // Logout user
  @Mutation(() => Boolean)
  async logout(@Context() context: any): Promise<boolean> {
    context.res.clearCookie('jwt'); // clear the HttpOnly cookie
    return true; // indicate success
  }
}
