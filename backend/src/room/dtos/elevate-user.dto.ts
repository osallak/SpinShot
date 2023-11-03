import { IsNotEmpty, IsUUID } from 'class-validator';

export class ElevateUserDto {
  @IsNotEmpty()
  room: string;

  @IsUUID()
  @IsNotEmpty()
  user: string;
}
