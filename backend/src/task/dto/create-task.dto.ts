import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Название должно быть строкой' })
  title: string;

  @IsArray({ message: 'Тэги должны быть массивом' })
  @IsInt({ message: 'Неккоректные тэги', each: true })
  @IsOptional()
  tagsId: number[];

  @IsDateString()
  @IsOptional()
  deadline: Date;
}
