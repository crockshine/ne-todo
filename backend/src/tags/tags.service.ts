import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateTagDto } from "./dto/create-tag.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Tag } from "./entities/tag";

@Injectable()
export class TagsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    try {

      return await this.prismaService.tag.create({
        data: {
          ...createTagDto,
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

  async findAll(): Promise<Tag[]> {
    try {
      return await this.prismaService.tag.findMany({
        omit: {
          userId: true
        }
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async delete(id: string): Promise<{ id: string }> {
    try {
      return await this.prismaService.tag.delete({
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
