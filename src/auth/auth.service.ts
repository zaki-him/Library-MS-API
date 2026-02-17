import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MemberService } from 'src/member/member.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private memberService: MemberService) {}
  async validateMember(email: string, password: string) {
    const member = await this.memberService.findOneByEmail(email)

    if(!member) throw new NotFoundException('Member not found')

    const isPassMatched = bcrypt.compare(password, member.password)

    if(!isPassMatched) throw new BadRequestException('Invalid credentials')

    const validatedMember = {
      id: member.id,
      name: member.name,
      email: member.email,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt
    }

    return validatedMember
  }

  async registerMember(name: string, email: string, password: string) {
    const existingMember = await this.memberService.findOneByEmail(email)

    if(existingMember) throw new BadRequestException('Email already in use')

    const newMember = await this.memberService.create({
      name, email, password
    })

    return {
      id: newMember.id,
      name: newMember.name,
      email: newMember.email,
      createdAt: newMember.createdAt,
      updatedAt: newMember.updatedAt
    }
  }
}
