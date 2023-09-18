import { RoomType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNotEmptyObject } from 'class-validator';

export class MuteUserInRoomDto {
  @IsNotEmptyObject()
  wannaBeMuted: object;

  @IsNotEmpty()
  name: string;

	@IsEnum(RoomType)
  type: RoomType;

	@IsNotEmpty()
	userId: string;

}
