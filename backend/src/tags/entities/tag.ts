import { EColor } from "@prisma/client";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Tag {
  @ApiProperty({description: 'ID  тега'})
  id: string;
  @ApiProperty({description: 'Название тега'})
  value: string;
  @ApiProperty({enum: EColor, description: 'Цвет'})
  color: EColor;
}