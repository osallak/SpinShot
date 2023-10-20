import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class GameOptionsDto {
  @ApiProperty({
    description: 'game mode',
    enum: ['time', 'defi'],
    example: 'time',
    type: String,
  })
  @IsEnum(['time', 'defi'], {
    message: 'mode must be time or defi',
  })
  mode: string;

  @ApiProperty({
    description: 'game map',
    enum: ['normal', 'hard', 'expert'],
    example: 'normal',
    type: String,
  })
  @IsEnum(['normal', 'hard', 'expert'], {
    message: 'map must be normal, hard or expert',
  })
  map: string;
}
