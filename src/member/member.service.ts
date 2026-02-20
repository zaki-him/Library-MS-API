import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt'

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async create(createMemberDto: CreateMemberDto) {
    const { name, email, password } = createMemberDto;
    const exists = await this.memberRepository.findOne({
      where: { email },
    })

    if (exists) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPass = await bcrypt.hash(password, 10)

    const newMember = this.memberRepository.create({
      name,
      email,
      password: hashedPass,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    await this.memberRepository.save(newMember)

    return { ...newMember, password: undefined}
  }

  async findAll() {
    return await this.memberRepository.find();
  }

  async findOne(id: string) {
    return await this.memberRepository.findOne({
      where: { id }
    });
  }

  async findOneByEmail(email: string) {
    return await this.memberRepository.findOne({
      where: { email },
    });
  }

  async update(id: string, updateMemberDto: UpdateMemberDto) {
    const member = await this.memberRepository.findOne({
      where: {id}
    })

    if(!member){
      throw new NotFoundException('Member Not Found')
    }

    if(updateMemberDto.email && updateMemberDto.email != member.email){
      const exists = await this.findOneByEmail(updateMemberDto.email)
      if(exists) throw new BadRequestException('Email already in use')
    }

    const payload: Partial<Member> = { ...updateMemberDto, updatedAt: new Date() }

    if(updateMemberDto.password){
      payload.password = await bcrypt.hash(updateMemberDto.password, 10)
    }

    await this.memberRepository.update(id, payload)
    const updated = await this.findOne(id)
    return { ...updated, password: undefined }
  }

  remove(id: string) {
    const member = this.findOne(id)
    if(!member) throw new NotFoundException('Member Not Found')
    return this.memberRepository.delete(id)
  }
}
