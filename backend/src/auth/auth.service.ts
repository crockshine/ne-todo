import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {RegisterDto} from "./dto/register.dto";
import * as bcrypt from "bcrypt";
import {AuthResponse, Tokens} from "./interfaces/auth.response";
import {JwtPayload} from "./interfaces/jwt.payload";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {Response, Request} from "express";
import {isHTTPS} from "../utils/isHTTPS";
import {User} from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // регистрация
  async register(res: Response, dto: RegisterDto): Promise<AuthResponse> {
    const {email, password} = dto
    const existUser = await this.prismaService.user.findUnique({
      where: {email},
      select: {email: true}
    })

    if (existUser) {
      throw new ConflictException('Такой пользователь уже существует')
    }

    const _salt =  await bcrypt.genSalt();
    const pHash = await bcrypt.hash(password, _salt)

    const user = await this.prismaService.user.create({
      data: {
        ...dto,
        password: pHash,
      },
      select: {id: true}
    })

    return this.successAuth(res, {id: user.id})
  }

  // вход
  async login(res: Response, dto: RegisterDto): Promise<AuthResponse> {
    const {email, password} = dto
    const user = await this.prismaService.user.findUnique({
      where: {email},
      select: {id: true, password: true}
    })

    if (!user) {
      throw new ConflictException('Пользователь не найден')
    }

    const isVerified = await bcrypt.compare(password, user.password)

    if (!isVerified) {
      throw new ConflictException('Пользователь не найден')
    }

    return this.successAuth(res, {id: user.id})
  }

  // выход
  async logout(res: Response): Promise<boolean> {
    this.applyCookie(res, 'refresh_token', new Date(0))
    return true
  }

  // обновление
  async refresh(res: Response, req: Request): Promise<AuthResponse> {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new UnauthorizedException('Не дейсвтительный токен')
    }

    let payload: JwtPayload;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken)
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Не дейсвтительный токен')
    }
    return this.successAuth(res, payload)
  }

  // получить юзера по id
  async getUser(id: string): Promise<User>{
    const user = await this.prismaService.user.findUnique({
      where: { id }
    })
    if (!user) {
      throw new NotFoundException('Пользователь не найден')
    }
    return user
  }

  // успешная аутентификация
  private successAuth(res: Response, payload: JwtPayload): AuthResponse {
    const { accessToken, refreshToken } = this.generateTokens({ id: payload.id });
    this.applyCookie(res, refreshToken, new Date(Date.now() + 1000 * 60 * 60 * 24 * 7))
    return {accessToken}
  }

  // применить куки
  private applyCookie(res: Response, data: string, expires: Date) {
    res.cookie('refresh_token', data, {
      httpOnly: true,
      secure: isHTTPS(this.configService),
      sameSite: 'lax',
      expires,
    });
  }

  // токены
  private generateTokens(payload: JwtPayload): Tokens {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.getOrThrow('JWT_ACCESS_TOKEN_TTL'),
    })

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.getOrThrow('JWT_REFRESH_TOKEN_TTL'),
    })

    return {accessToken, refreshToken}
  }

}
