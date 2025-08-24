import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { IsString, MinLength, Matches } from 'class-validator';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
export class RegisterInput {
  @Field()
  @IsString()
  username: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;
}

@InputType()
export class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
