import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MemberService } from 'src/member/member.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, MemberService],
})
export class AuthModule {}
