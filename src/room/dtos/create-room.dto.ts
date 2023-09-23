import { RoomType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateRoomDto {
  @IsEnum(RoomType)
  type: RoomType;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  @MinLength(6)
  password?: string;
}
