import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { string } from 'joi';

export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    type: String,
    minLength: 3,
    maxLength: 16,
    example: 'john_doe',
  })
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_-]{3,16}$/, {
    message:
      'Username must be between 3 and 16 characters and can contain only letters, numbers, underscores and dashes',
  })
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    type: String,
    example: 'valid@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @ApiProperty({
    description: 'The password of the user',
    type: String,
    minLength: 6,
    example: 'password',
  })
  @IsNotEmpty()
  password: string;
}

export class SignInUserDto {
  @ApiProperty({
    description: 'The username of the user',
    type: string,
    example: 'john_doe',
  })
  username: string;

  password: string;
}
