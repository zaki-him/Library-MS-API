import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorrepository: Repository<Author>
  ) {}
  async resolveAuthor(createAuthorDto: CreateAuthorDto) {
    let author = await this.authorrepository.findOne({
      where: {
        first_name: createAuthorDto.firstName,
        last_name: createAuthorDto.lastName
      }
    })

    if(!author){
      author = await this.authorrepository.save(this.authorrepository.create({
        last_name: createAuthorDto.lastName,
        first_name: createAuthorDto.firstName
      }))
    }

    return author
  }
}
