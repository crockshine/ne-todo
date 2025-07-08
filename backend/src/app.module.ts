import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [TasksModule, PrismaModule, TagsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
