import { RoomType } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class banUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  userToBeBanned: string;

  @IsEnum(RoomType)
  type: RoomType;
}
