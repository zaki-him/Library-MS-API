import { BaseEntity } from "src/lib/base.entity";
import { BookCategory } from "src/lib/enums/book.enum";
import { Column, CreateDateColumn, Entity, OneToMany } from "typeorm";
import { BookAuthor } from "./book-author.entity";

@Entity()
export class Book extends BaseEntity{
  @Column("varchar", { length: 90 })
  title: string

  @Column("integer", { default: 1 })
  copies_owned: number

  @Column("enum", { enum: BookCategory })
  category: BookCategory

  @Column({ type: "date" })
  publication_date: Date

  @OneToMany(() => BookAuthor, bookAuthor => bookAuthor.book)
  book_authors: BookAuthor[]
}