import { BookCategory } from "src/lib/enums/book.enum"

export class CreateBookDto {
  title: string
  category: BookCategory
  copies_owned?: number
}