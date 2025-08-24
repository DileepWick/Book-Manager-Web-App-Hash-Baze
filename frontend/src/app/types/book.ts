export interface Book {
  id: string; // add type here
  title: string;
  author: string;
  publishedYear: number;
  genre: string;
}

export interface BookInput {
  title: string;
  author: string;
  publishedYear: number;
  genre: string;
}
