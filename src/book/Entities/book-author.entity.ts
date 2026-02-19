import { BaseEntity } from "src/lib/base.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { Book } from "./book.entity";
import { Author } from "src/author/entities/author.entity";

@Entity()
export class BookAuthor extends BaseEntity {
  @ManyToOne(() => Book, book => book.book_authors, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "book_id" })
  book: Book

  @ManyToOne(() => Author, author => author.book_authors)
  @JoinColumn({ name: "author_id" })
  author: Author
}