import { IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EColor } from "@prisma/client";

export class CreateTagDto {
  @ApiProperty({description: 'Название тега'})
  @IsString({ message: 'Название должно быть строкой' })
  @IsNotEmpty()
  value: string;

  @ApiPropertyOptional({description: 'айди цвета', enum: EColor})
  @IsEnum( EColor, { message: 'цвет должен быть енамом' })
  @IsNotEmpty()
  color: EColor;
}