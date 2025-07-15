import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {AuthService} from "../auth.service";
import {ConfigService} from "@nestjs/config";
import {JwtPayload} from "../interfaces/jwt.payload";
import {User} from "@prisma/client";
import {Injectable} from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false
    });
  }

  // после чтения jwt токена
  // пихаем в Request.user пользователя по id из jwt

  async validate(payload: JwtPayload): Promise<User> {
    return await this.authService.getUser(payload.id)
  }
}