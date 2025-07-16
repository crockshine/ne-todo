import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RegisterDto {
  @IsNotEmpty({message: 'emeil not emty'})
  @ApiProperty({name: 'email'})
  @IsEmail({}, {message: 'емейл'})
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({name: 'name'})
  name: string;

  @IsNotEmpty()
  @MinLength(6, {message: 'Минимум 6 символов'})
  @ApiProperty({name: 'password'})
  password: string;
}