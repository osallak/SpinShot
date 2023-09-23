import { MuteDurations, RoomType } from '@prisma/client';
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
  @IsEnum(MuteDurations)
  time: MuteDurations; 
  @IsNumber()
  mutedAt: bigint;
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
