import { IsNotEmpty } from 'class-validator';

export class leaveRoomDto {
  @IsNotEmpty()
  readonly room: string;
}
