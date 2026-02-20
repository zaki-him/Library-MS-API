import { CreateAuthorDto } from "src/author/dto/create-author.dto"
import { BookCategory } from "src/lib/enums/book.enum"

export class CreateBookDto {
  title: string
  category: BookCategory
  copiesOwned?: number
  publicationDate: string
  authors: CreateAuthorDto[]
}