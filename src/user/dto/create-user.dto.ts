import { Exclude } from 'class-transformer';
import { IsDefined, IsEmail, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @Matches(/^[a-zA-Z0-9_-]{3,16}$/, {
    message:
      'Username must be between 3 and 16 characters and can contain only letters, numbers, underscores and dashes',
  })
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
