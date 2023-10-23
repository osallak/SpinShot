import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { CreateUserDto } from '../../auth/dto/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'first name of the user',
    example: 'oussama',
  })
  @IsOptional()
  @MinLength(3)
  firstName: string;

  @ApiProperty({
    description: 'last name of the user',
    example: 'sallak',
  })
  @IsOptional()
  @MinLength(3)
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  oldPassword: string;

  @Exclude()
  email: string;
}
