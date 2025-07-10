import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  private readonly JWT_SECRET: string;
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_SECRET = this.configService.getOrThrow<string>('JWT_SECRET')
    this.JWT_ACCESS_TOKEN_TTL = this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_TTL')
    this.JWT_REFRESH_TOKEN_TTL = this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN_TTL')
  }

  async register(dto: RegisterDto): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const { name, email, password } = dto;

    // есть ли юзер с такой почтой
    const existUser = await this.prismaService.user.findUnique({
      where: { email }
    });

    if (existUser) {
      throw new ConflictException("Пользователь с такой почтой существует");
    }

    // хэш пароля
    const _salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, _salt);

    // создаем юзера
    const user = await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    return this.getJwtTokens({id: user.id});
  }

  private getJwtTokens(payload: { id: string }) {
      const accessToken = this.jwtService.sign(payload, {
        expiresIn: this.JWT_ACCESS_TOKEN_TTL
      });

      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: this.JWT_REFRESH_TOKEN_TTL
      });

      return {
        accessToken,
        refreshToken
      }
  }
}
