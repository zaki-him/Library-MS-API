import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MemberService } from 'src/member/member.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private memberservice: MemberService) {}
  async validateMember(email: string, password: string) {
    const member = await this.memberservice.findOneByEmail(email)

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
}
