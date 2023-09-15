import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  name: string;

  @MinLength(6)
  password: string;
}
