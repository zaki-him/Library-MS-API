import { BookAuthor } from "src/book/Entities/book-author.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "src/lib/base.entity";

@Entity()
export class Author extends BaseEntity {
  @Column()
  first_name: string

  @Column()
  last_name: string

  @OneToMany(() => BookAuthor, bookAuthor => bookAuthor.author)
  book_authors: BookAuthor[]
}