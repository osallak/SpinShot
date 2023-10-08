import { RoomType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, MinLength, ValidateIf } from 'class-validator';

export class CreateRoomDto {
  @IsEnum(RoomType)
  type: RoomType;

  @IsNotEmpty()
  name: string;

	@ValidateIf((o) => o.type === RoomType.PROTECTED)
  @MinLength(6)
  password?: string;
}
