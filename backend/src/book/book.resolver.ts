import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Book, BookInput } from './book.model';
import { BookService } from './book.service';
import { GqlAuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { UsePipes  , ValidationPipe} from '@nestjs/common';

@Resolver(() => Book)
export class BookResolver {
  // Inject BookService
  constructor(private readonly bookService: BookService) {}

  // Get all books
  @Query(() => [Book])
  @UseGuards(GqlAuthGuard)
  books() {
    return this.bookService.findAll();
  }

  // Get a book by ID
  @Query(() => Book, { nullable: true })
  book(@Args('id', { type: () => ID }) id: string) {
    return this.bookService.findOne(id);
  }

  // Create a new book
  @Mutation(() => Book)
  @UseGuards(GqlAuthGuard)
  @UsePipes(new ValidationPipe())
  createBook(@Args('input') input: BookInput) {
    return this.bookService.create(input);
  }

  //Update a book by ID
  @Mutation(() => Book, { nullable: true })
  @UseGuards(GqlAuthGuard)
  updateBook(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: BookInput,
  ) {
    return this.bookService.update(id, input);
  }

  // Remove a book by ID
  @Mutation(() => Book, { nullable: true })
  @UseGuards(GqlAuthGuard)
  removeBook(@Args('id', { type: () => ID }) id: string) {
    return this.bookService.remove(id);
  }
}
