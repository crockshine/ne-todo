import { IsArray, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
  tagsId?: number[];

  @ApiPropertyOptional({
    description: 'Дедлайн задачи',
  })
  @IsOptional()
  @IsDate({ message: 'Дедлайн должен быть датой' })
  deadline?: Date;
}