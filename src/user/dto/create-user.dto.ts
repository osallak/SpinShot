import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @Matches(/^[a-zA-Z0-9_-]{3,16}$/, {
    message:
      'Username must be between 3 and 16 characters and can contain only letters, numbers, underscores and dashes',
  })
  @ApiProperty({
    description: 'The username of the user',
    type: String,
    minLength: 3,
    maxLength: 16,
    example: 'john_doe',
  })
  username: string;

  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    type: String,
    example: 'valid@email.com',
  })
  email: string;

  @MinLength(6)
  @ApiProperty({
    description: 'The password of the user',
    type: String,
    minLength: 6,
    example: 'password',
  })
  password: string;
}

export class SignInUserDto {

  @ApiProperty({
    description: 'The username of the user',
    type: String,
    example: 'john_doe',
  })
  username: string;

  password: string;
}
