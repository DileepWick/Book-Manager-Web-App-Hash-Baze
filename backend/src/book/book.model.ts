import { ObjectType, Field, Int, ID, InputType } from '@nestjs/graphql';
import { IsString, IsInt, Min, Max } from 'class-validator';

@ObjectType()
export class Book {
  @Field(() => ID)  
  id: string;

  @Field()
  title: string;

  @Field()
  author: string;

  @Field(() => Int)
  publishedYear: number;

  @Field()
  genre: string;
}

@InputType()
export class BookInput {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  author: string;

  @Field(() => Int)
  @IsInt()
  @Min(1500)
  @Max(new Date().getFullYear())
  publishedYear: number;

  @Field()
  @IsString()
  genre: string;
}
