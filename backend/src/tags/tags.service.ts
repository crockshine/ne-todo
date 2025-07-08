import { Injectable } from "@nestjs/common";
import { CreateTagDto } from "./dto/create-tag.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TagsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    try {
      await this.prismaService.tag.create({
        data: {
          ...createTagDto,
          userId: 1
        }
      });
      return createTagDto;
    } catch (error) {
      return error;
    }

  }

  findAll() {
    return this.prismaService.tag.findMany();
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
