import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStartegy extends PassportStrategy(Strategy){
  constructor(private authService: AuthService) {
    super({ usernameField: 'email'})
  }

  async validate(email:string, password: string) {
    return await this.authService.validateMember(email, password)
  }

  async register(name: string, email: string, password: string){
    return await this.authService.registerMember(name, email, password)
  }
}