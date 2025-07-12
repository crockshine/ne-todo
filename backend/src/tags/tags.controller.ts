import {Controller, Get, Post, Body, Param, Delete, Res, Req} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";
import { Tag } from "./entities/tag";

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiOperation({
    summary: 'Создать тег'
  })
  @ApiOkResponse({
    description: 'Созданный тег',
    type: [Tag],
  })
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @ApiOperation({
    summary: 'Получить список всех тегов',
  })
  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @ApiOperation({
    summary: 'Удалить тег по айди'
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'по этому айди будет произведен поиск'
  })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tagsService.delete(id);
  }
}
