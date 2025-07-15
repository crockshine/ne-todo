import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthResponse} from "./interfaces/auth.response";
import {Request, Response} from 'express'
import {RegisterDto} from "./dto/register.dto";
import {Auth} from "./decorators/auth.decorator";
import {User as TUser} from "@prisma/client";
import {User} from "./decorators/user.decorator";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Res({passthrough: true}) res: Response, @Body() dto: RegisterDto): Promise<AuthResponse> {
    return this.authService.register(res, dto)
  }

  @Post('login')
  async login(@Res({passthrough: true}) res: Response, @Body() dto: RegisterDto): Promise<AuthResponse> {
    return this.authService.login(res, dto)
  }

  @Post('logout')
  async logout(@Res({passthrough: true}) res: Response): Promise<boolean> {
    return this.authService.logout(res)
  }

  @Post('refresh')
  async refresh(@Res({passthrough: true}) res: Response, @Req() req: Request): Promise<AuthResponse> {
    return this.authService.refresh(res, req)
  }

  @Auth()
  @Get('profile')
  async profile(@User() user: TUser) {
    return user
  }
}
