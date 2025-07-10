import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({name: 'email', description: 'Почта в формате email', example: 'admin@example.com'})
  @IsEmail({}, {message: 'Неправильный формат почты'})
  @IsNotEmpty({message: 'Необходимо ввести почту'})
  email: string;

  @ApiProperty({name: 'name', description: 'Имя не больше 15 символов', example: 'crockshine'})
  @IsString({message: 'Неправильный формат имени'})
  @IsNotEmpty({message: 'Необходимо ввести имя'})
  @MaxLength(15, {message: 'Имя слишком большое'})
  name: string;

  @ApiProperty({name: 'password', description: 'Пароль не меньше 6 символов', example: '123456'})
  @IsString({message: 'Неправильный формат пароля'})
  @IsNotEmpty({message: 'Необходимо ввести пароль'})
  @MinLength(6, {message: 'Пароль слишком короткий'})
  password: string;
}