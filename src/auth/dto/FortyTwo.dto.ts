import {
	IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsString,
    IsUUID,
    IsUrl,
    Matches
} from 'class-validator';

export class FortyTwoDto {
  @Matches(/^[a-zA-Z0-9_-]{3,16}$/, {
    message:
      'Username must be between 3 and 16 characters and can contain only letters, numbers, underscores and dashes',
  })
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsUrl()
  avatar: string;

  @IsString()
  country: string;

	@IsUUID()
	id: string;

	@IsBoolean()
	isTwoFaAuthenticated: boolean;

	@IsBoolean()
	twoFactorAuth: boolean;
}
