import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResponse } from "./interfaces/auth.response";
import { Request, Response } from "express";
import { RegisterDto } from "./dto/register.dto";
import { Auth } from "./decorators/auth.decorator";
import { User as TUser } from "@prisma/client";
import { User } from "./decorators/user.decorator";
import { ApiResponse } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    example: {accessToken: "se54d67t8hi1u2s...."}
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    example:
  })
  @HttpCode(HttpStatus.CREATED)
  @Post("register")
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterDto,
  ): Promise<AuthResponse> {
    console.log(dto);
    return this.authService.register(res, dto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    example: {accessToken: "se54d67t8hi1u2s...."},
  })
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterDto,
  ): Promise<AuthResponse> {
    return this.authService.login(res, dto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    example: true,
  })
  @HttpCode(HttpStatus.OK)
  @Post("logout")
  async logout(@Res({ passthrough: true }) res: Response): Promise<boolean> {
    return this.authService.logout(res);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    example: {accessToken: "se54d67t8hi1u2s...."},
  })
  @HttpCode(HttpStatus.OK)
  @Post("refresh")
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ): Promise<AuthResponse> {
    return this.authService.refresh(res, req);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    example: {
      id: '12we212s1...',
      name: 'Igor',
      email: 'test@mail.com',
      password: '12we212s1...',
    }
  })
  @HttpCode(HttpStatus.OK)
  @Auth()
  @Get("profile")
  async profile(@User() user: TUser): Promise<TUser> {
    return user;
  }
}
