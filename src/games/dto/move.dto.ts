import { Max, Min } from 'class-validator';
import { WIDTH } from '../pong/pong.settings';

export class MoveDto {
  @Min(0)
  @Max(WIDTH)
  x: number;
}
