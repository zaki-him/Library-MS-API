import { CreateAuthorDto } from "src/author/dto/create-author.dto"
import { Author } from "src/author/entities/author.entity"
import { BookCategory } from "src/lib/enums/book.enum"

export class CreateBookDto {
  title: string
  category: BookCategory
  copies_owned?: number
  publication_date: Date
  authors: CreateAuthorDto[]
}