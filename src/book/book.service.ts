import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './Entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>
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
      throw new BadRequestException('Book already created')
    }

    const newBook = this.bookRepository.create({
      title,
      category,
      copies_owned
    })

    await this.bookRepository.save(newBook)
    return newBook
  }
}
