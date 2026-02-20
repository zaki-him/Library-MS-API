import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './Entities/book.entity';
import { AuthorService } from 'src/author/author.service';
import { Author } from 'src/author/entities/author.entity';
import { BookAuthor } from './Entities/book-author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author, BookAuthor])],
  controllers: [BookController],
  providers: [BookService, AuthorService],
})
export class BookModule {}
