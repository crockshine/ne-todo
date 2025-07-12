import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { IRegisterResponse } from "./interfaces/register-response.interface";
import { JwtPayload } from "./interfaces/jwt-payload";
import { LoginDto } from "./dto/login.dto";
import { Response } from "express";
import { Request } from "express";
import { isHTTPS } from "../utils/isHTTPS";

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;
  private readonly COOKIE_HOST: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = this.configService.getOrThrow<string>(
      "JWT_ACCESS_TOKEN_TTL",
    );
    this.JWT_REFRESH_TOKEN_TTL = this.configService.getOrThrow<string>(
      "JWT_REFRESH_TOKEN_TTL",
    );
    this.COOKIE_HOST = this.configService.getOrThrow<string>("COOKIE_HOST");
  }

  // регистрация юзера
  async register(res: Response, dto: RegisterDto): Promise<IRegisterResponse> {
    const { name, email, password } = dto;

    // есть ли юзер с такой почтой
    const existUser = await this.prismaService.user.findUnique({
      where: { email },
      select: { email: true },
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
        password: hashedPassword,
      },
    });

    return this.auth(res, { id: user.id });
  }

  // вход
  async login(res: Response, dto: LoginDto): Promise<IRegisterResponse> {
    const { email, password } = dto;

    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true, password: true },
    });

    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new NotFoundException("Пользователь не найден");
    }

    return this.auth(res, { id: user.id });
  }

  // обновить оба токена по refresh токену
  async refresh(req: Request, res: Response) {
    const refreshToken: string = req.cookies["refresh_token"];
    let payload: JwtPayload;

    try {
      payload = await this.jwtService.verifyAsync(refreshToken);
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException("Недейсвтительный токен");
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: payload.id },
      select: { id: true },
    });

    if (!user) {
      await this.logout(res)
      throw new NotFoundException("Пользователь не найден");
    }

    return this.auth(res, { id: user.id });
  }

  // разлогин
  async logout(res: Response) {
    this.setCookie(res, "refresh_token", new Date(0));
    return true;
  }

  // успешный ответ
  private auth(res: Response, payload: JwtPayload): IRegisterResponse {
    const { refreshToken, accessToken } = this.getJwtTokens(payload);
    this.setCookie(
      res,
      refreshToken,
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    );

    return { accessToken };
  }

  // указать в Response refresh куку
  private setCookie(res: Response, value: string, ttl: Date) {
    res.cookie("refresh_token", value, {
      httpOnly: true,
      secure: isHTTPS(this.configService),
      domain: this.COOKIE_HOST,
      sameSite: "lax",
      expires: ttl,
    });
  }

  // получить два токена
  private getJwtTokens(payload: JwtPayload) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}
