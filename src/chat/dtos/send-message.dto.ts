import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  content: string;

  @IsNumber()
  timestamp: bigint;
}
