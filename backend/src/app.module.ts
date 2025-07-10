import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { PrismaModule } from "./prisma/prisma.module";
import { TagsModule } from "./tags/tags.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TasksModule,
    TagsModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
