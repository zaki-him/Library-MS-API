import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getBooks(){
    return await this.bookService.findAll()
  }

  @Get(':id')
  async getOneBook(@Param('id') id: string){
    return await this.bookService.findOne(id)
  }

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto){
    return await this.bookService.create(createBookDto)
  }

  @Patch(':id')
  async updateBook(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto){
    return this.bookService.update(id, updateBookDto)
  }
}
