import { RoomType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNotEmptyObject } from 'class-validator';

class userToBeMuted {
  userId: string;
  time: Date;
}

export class MuteUserInRoomDto {
  @IsNotEmptyObject()
  wannaBeMuted: userToBeMuted;

  @IsNotEmpty()
  name: string;

  @IsEnum(RoomType)
  type: RoomType;

  @IsNotEmpty()
  userId: string;
}
