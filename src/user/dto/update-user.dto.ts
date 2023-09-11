import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Allow, IsEmail, IsOptional, Matches, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';


export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: "first name of the user",
    example: "oussama"
  })
  @IsOptional()
  firstName: string;

  @ApiProperty({
    description: "last name of the user",
    example: "sallak"
  })
  @IsOptional()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  country: string;

  @Exclude()
  email: string;
}
