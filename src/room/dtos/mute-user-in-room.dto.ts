import {  RoomType } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
  isNotEmpty,
  isNumber,
} from 'class-validator';

class userToBeMuted {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  time: string;
  @IsNotEmpty()
  mutedAt: string;
}

export class MuteUserInRoomDto {
  @ValidateNested()
  @IsNotEmptyObject()
  wannaBeMuted: userToBeMuted;

  @IsNotEmpty()
  name: string;

  @IsEnum(RoomType)
  type: RoomType;
}
