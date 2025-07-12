import {Body, Controller, Post, Req, Res} from "@nestjs/common";
import { AuthService } from './auth.service';
import { RegisterDto } from "./dto/register.dto";
import {LoginDto} from "./dto/login.dto";
import {Response} from "express";
import {Request} from "express";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Res({passthrough: true}) res: Response, @Body() dto: RegisterDto) {
    return await this.authService.register(res, dto)
  }

  @Post('login')
  async login(@Res({passthrough: true}) res: Response ,@Body() dto: LoginDto) {
    return await this.authService.login(res, dto)
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res({passthrough: true}) res: Response){
    return await this.authService.refresh(req, res);
  }

  @Post('logout')
  async logout(@Res({passthrough: true}) res: Response){
    return await this.authService.logout(res);
  }
}
