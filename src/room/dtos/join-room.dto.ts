import { RoomType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class JoinRoomDto {
  @IsNotEmpty()
  userId: string;

  @IsEnum(RoomType)
  type: RoomType;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  password?: string;
}
