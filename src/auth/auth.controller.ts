import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalStartegy } from './strategies/local.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly localStrategy: LocalStartegy) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    const {email, password} = req.body
    return this.localStrategy.validate(email, password)
  }

  @Post('register')
  async register(@Request() req) {
    const { name, email, password } = req.body
    return await this.localStrategy.register(name, email, password)
  }
}
