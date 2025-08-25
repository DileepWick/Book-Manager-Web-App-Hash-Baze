// Type definitions for Book entity
export interface Book {
  id: string; // add type here
  title: string;
  author: string;
  publishedYear: number;
  genre: string;
}

// Input type for creating or updating a book
export interface BookInput {
  title: string;
  author: string;
  publishedYear: number;
  genre: string;
}
