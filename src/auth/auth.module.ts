import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MemberService } from 'src/member/member.service';
import { LocalStartegy } from './strategies/local.strategy';
import { Member } from 'src/member/entities/member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [AuthController],
  providers: [AuthService, MemberService, LocalStartegy],
})
export class AuthModule {}
