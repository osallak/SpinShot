import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Query,
  Req,
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
import { Response, toObject } from 'src/global/interfaces';
import { Response as ExpressResponse, query, response } from 'express';
import { PaginationQueryDto } from 'src/global/dto/pagination-query.dto';
import { QueueScheduler } from 'rxjs/internal/scheduler/QueueScheduler';

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
  @UseGuards(JwtAuthGuard)
  @Post('add')
  async createRoom(
    @Req() request: Request,
    @Body() room: CreateRoomDto,
    @Res() response: ExpressResponse,
  ) {
    const res = await this.roomService.createRoom(
      (request as any)?.user?.id,
      room,
    );
    if (res) return response.status(res.status).json(res);
    else {
      return response.status(500).send('Error Fatal');
    }
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('join')
  async joinRoom(
    @Req() request: Request,
    @Body() room: JoinRoomDto,
    @Res({ passthrough: true }) response: ExpressResponse,
  ) {
    const res = await this.roomService.joinRoom(
      (request as any)?.user?.id,
      room,
    );
    if (res) return response.status(res.status).json(res.message);
    else {
      return response.status(500).send('Error Fatal');
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('mute')
  async muteUsersInRoom(
    @Req() request: Request,
    @Body() room: MuteUserInRoomDto,
    @Res() response: ExpressResponse,
  ) {
    const res = await this.roomService.muteUserInRoom(
      (request as any)?.user?.id,
      room,
    );
    if (res) return response.status(res.status).json(res);
    else {
      return response.status(500).send('Error Fatal');
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllRooms(@Req() request: Request, @Res() response: ExpressResponse) {
    const res = await this.roomService.getAllRooms((request as any)?.user?.id);
    if (res) return response.status(res.status).json(res?.data);
    else {
      return response.status(500).send('Error Fatal');
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('individual/:id')
  async getSpecificRoom(
    @Param(':id') room: string,
    @Req() request: Request,
    @Res() response: ExpressResponse,
    @Query() query: PaginationQueryDto,
  ) {
    const res = await this.roomService.getSpecificRoom(query, room);
    if (res)
      return response.status(res.status).json(toObject.call(res.content));
    else {
      return response.status(500).send('Error Fatal');
    }
  }
}
