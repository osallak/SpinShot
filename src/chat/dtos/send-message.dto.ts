import { IsDateString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty()
  @IsUUID()
  from: string;

  @IsNotEmpty()
  @IsUUID()
  to: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  timestamp: string;

  senderUsername?: string;
  senderAvatar?: string;
}

export class sendRoomMessageDto {
  @IsUUID()
  from: string;

  @IsNotEmpty()
  roomName: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  timestamp: string;

  senderUsername?: string;
  senderAvatar?: string;
}
