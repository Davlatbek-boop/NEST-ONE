import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsDecimal, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBuilderDto {
  @ApiProperty({
      example: "builder1",
      description: "Builder ismi"
    })
  @IsString({message: "name string bulishi kerak"})
  @IsNotEmpty()
  full_name: string;
  @ApiProperty({
    example: "2000-01-01",
    description: "Builder birth_day"
  })
  @IsDateString()
  birth_day: Date;
  @ApiProperty({
    example: "123.00",
    description: "Builder salary"
  })
  @IsNumber()
  salary: number;

  @ApiProperty({
    example: "2",
    description: "companyId"
  })
  @IsNumber()
  companyId: number;
}
