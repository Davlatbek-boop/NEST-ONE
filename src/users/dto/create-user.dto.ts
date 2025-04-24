import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "user1",
    description: "Foydalanuvchi ismi"
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "user1@mail.uz",
    description: "Foydalanuvchi emaili"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "Uzbek1$t0n",
    description: "Foydalanuvchi paroli"
  })
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 0,
    minSymbols: 0,
    minNumbers: 0,
  })
//   @MinLength(6)
  password: string;

  @ApiProperty({
    example: "USER",
    description: "Foydalanuvchi roli"
  })
  @IsString()
  @IsNotEmpty()
  value: string;
}
