import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login() {}

  @Post('register')
  async register(@Request() req) {
    const { name, email, password } = req.body
    return await this.authService.registerMember(name, email, password)
  }
}
