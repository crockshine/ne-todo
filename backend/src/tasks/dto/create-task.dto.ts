import { IsArray, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from "class-transformer";

export class CreateTaskDto {
  @ApiProperty({
    description: 'Название задачи',
  })
  @IsString({ message: 'Название должно быть строкой' })
  title: string;

  @ApiPropertyOptional({
    description: 'ID тегов задачи',
    type: [Number],
  })
  @IsOptional()
  @IsArray({ message: 'Теги должны быть массивом' })
  @IsNumber({}, { each: true, message: 'ID должны быть числами' })
  tagsId?: string[];

  @ApiPropertyOptional({
    description: 'Дедлайн задачи',
  })
  @IsOptional()
  @IsDate({ message: 'Дедлайн должен быть датой' })
  @Type(() => Date)
  deadline?: Date | null;
}