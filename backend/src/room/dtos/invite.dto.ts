import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class InviteDto {
  @ApiProperty({
    description: 'The id of the user to be invited',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly userId: string;

  @ApiProperty({
    description: 'The id of the room to invite the user to',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly roomName: string;
}
