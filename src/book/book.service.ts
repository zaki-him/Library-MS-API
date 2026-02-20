import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './Entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { BookAuthor } from './Entities/book-author.entity';
import { AuthorService } from 'src/author/author.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(BookAuthor)
    private bookAuthorRepo: Repository<BookAuthor>,
    private authorService: AuthorService
  ) {}

  async findAll() {
    return await this.bookRepository.find()
  }

  async findOne(id: string) {
    return await this.bookRepository.findOne({
      where: { id }
    })
  }

  async create(createBookDto: CreateBookDto) {
    const { title, category, copies_owned, publication_date } = createBookDto
    const book = await this.bookRepository.findOne({
      where: { title }
    })

    if(book){
      throw new BadRequestException('Book already added')
    }

    const newBook = this.bookRepository.create({
      title,
      category,
      copies_owned,
      publication_date
    })

    await this.bookRepository.save(newBook)

    const relations: BookAuthor[] = []

    for(const authorInput of createBookDto.authors){
      const author = await this.authorService.resolveAuthor(authorInput)

      relations.push(
        this.bookAuthorRepo.create({
          book: newBook,
          author: author
        })
      )
    }

    await this.bookAuthorRepo.save(relations)
    return newBook
  }
}
