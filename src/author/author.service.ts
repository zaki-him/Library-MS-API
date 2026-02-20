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
  async resolveAuthor(createAuthordto: CreateAuthorDto) {
    let author = await this.authorrepository.findOne({
      where: {
        first_name: createAuthordto.first_name,
        last_name: createAuthordto.last_name
      }
    })

    if(!author){
      author = await this.authorrepository.save(this.authorrepository.create({
        last_name: createAuthordto.last_name,
        first_name: createAuthordto.first_name
      }))
    }

    return author
  }
}
