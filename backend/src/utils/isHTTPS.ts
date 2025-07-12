import {ConfigService} from "@nestjs/config";

export const isHTTPS = (configService: ConfigService) =>
  configService.getOrThrow<string>('PROTOCOL') === 'HTTPS';