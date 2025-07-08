import { Global, Module } from "@nestjs/common";
import { PrismaService } from './prisma.service';

// декоратор, если подключишь еще в app, то не нужно импортить в остальных модулях
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
