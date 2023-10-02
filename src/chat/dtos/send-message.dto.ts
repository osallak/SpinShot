import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  timestamp: string;
}

export class sendRoomMessageDto {
  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  roomName: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  timestamp: string;
}
