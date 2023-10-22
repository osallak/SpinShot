import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class ProtectRoomDto {
  @IsNotEmpty()
  room: string;

  @MinLength(6)
  password: string;
}
