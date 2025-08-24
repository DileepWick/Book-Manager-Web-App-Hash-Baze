import { Injectable } from '@nestjs/common';
import { Book, BookInput } from './book.model';
import { v4 as uuid } from 'uuid';
import { INITIAL_BOOKS } from './initial-books';

@Injectable()
export class BookService {
  private books: Book[] = [...INITIAL_BOOKS]; // initialize with default books

  // Create a new book
  create(bookInput: BookInput): Book {
    const book: Book = {
      id: uuid(),
      ...bookInput,
    };
    this.books.push(book);
    return book;
  }

  // Update a book by ID
  update(id: string, bookInput: BookInput): Book | null {
    const book = this.books.find(b => b.id === id);
    if (!book) return null;
    Object.assign(book, bookInput);
    return book;
  }

  // Get all books
  findAll() {
    return this.books;
  }

  // Find a book by ID
  findOne(id: string) {
    return this.books.find(b => b.id === id);
  }

  // remove a book by ID
  remove(id: string) {
    const index = this.books.findIndex(b => b.id === id);
    if (index === -1) return null;
    return this.books.splice(index, 1)[0];
  }
}
