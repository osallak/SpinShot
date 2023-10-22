import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VerifyPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
