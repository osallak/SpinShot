import { IsNotEmpty } from 'class-validator';

export class TwoFaAuthDto {
  @IsNotEmpty()
  code: string;
}
