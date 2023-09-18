import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';
import { CreateRoomDto } from './dtos/create-room.dto';
import { RoomService } from './room.service';
import { JoinRoomDto } from './dtos/join-room.dto';
import { MuteUserInRoomDto } from './dtos/mute-user-in-room.dto';
import { Response } from 'src/global/interfaces';
import { Response as ExpressResponse, response } from 'express';

@ApiTags('room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        status: 201,
        message: 'room created successfully',
      },
    },
  })
  @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Post('add')
  async createRoom(
    @Body() room: CreateRoomDto,
    @Res({ passthrough: true }) response: ExpressResponse,
  ) {
    const res = await this.roomService.createRoom(room);
    response.status(res.status).json(res);
  }

  @ApiResponse({
    status: 200,
    schema: {
      example: {
        status: 200,
        message: 'joined successfully',
      },
    },
  })
  // @UseGuards(JwtAuthGuard)
  @Post('join')
  async joinRoom(
    @Body() room: JoinRoomDto,
    @Res({ passthrough: true }) response: ExpressResponse,
  ) {
    const res = await this.roomService.joinRoom(room);
    response.status(res.status).json(res);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('mute')
  async muteUsersInRoom(
    @Body() room: MuteUserInRoomDto,
    @Res({ passthrough: true }) response: ExpressResponse,
  ) {
    const res = await this.roomService.joinRoom(room);
    response.status(res.status).json(res);
  }
}
