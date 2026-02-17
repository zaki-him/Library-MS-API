import { BaseEntity } from "src/lib/base.entity";
import { BookCategory } from "src/lib/enums/book.enum";
import { Column, CreateDateColumn, Entity } from "typeorm";

@Entity()
export class Book extends BaseEntity{
  @Column("varchar", { length: 90 })
  title: string

  @Column()
  copies_owned: number

  @Column("enum", { enum: BookCategory })
  category: BookCategory
}