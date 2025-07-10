import {Injectable} from '@nestjs/common';
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTagDto } from "../tags/dto/create-tag.dto";
import { Tag } from "../tags/entities/tag";

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService ) {}

  async create(createTaskDto: CreateTaskDto): Promise<CreateTaskDto> {
    try {
      return await this.prismaService.task.create({
        data: {
          ...createTaskDto,
          userId: "2",
        },
        omit: {
          userId: true
        }
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prismaService.task.findMany({
        omit: {
          userId: true
        }
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  findOne(id: string) {
    console.log('TasksService findOne', id);
  }

  update(id: string, task: UpdateTaskDto) {
    console.log('TasksService update', id, task);
  }

  async delete(id: string) {
    try {
      return await this.prismaService.task.delete({
        where: {
          id: id
        },
        select: {
          id: true
        }
      })
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
