import { IsNotEmpty } from 'class-validator';

export class ElevateUserDto {
  @IsNotEmpty()
  room: string;

  @IsNotEmpty()
  user: string;
}
