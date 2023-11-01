import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class ProtectRoomDto {
  @IsNotEmpty()
  room: string;

  @MinLength(6)
  password: string;
}

export class ChangePasswordDto {
  @IsNotEmpty()
  room: string;

  @MinLength(6)
  password: string;

  @MinLength(6)
  newPassword: string;
}

export class RemovePasswordDto {
  @IsNotEmpty()
  room: string;

}