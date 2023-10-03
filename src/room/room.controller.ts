import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';
import { CreateRoomDto } from './dtos/create-room.dto';
import { RoomService } from './room.service';
import { JoinRoomDto } from './dtos/join-room.dto';
import { MuteUserInRoomDto } from './dtos/mute-user-in-room.dto';
import { Response, toObject } from 'src/global/interfaces';
import { Response as ExpressResponse } from 'express';
import { PaginationQueryDto } from 'src/global/dto/pagination-query.dto';
import { Response as CustomResponse } from 'src/global/interfaces';
import { banUserDto } from './dtos/ban-user.dto';
import { ProtectRoomDto } from './dtos/protect-room.dto';
import { ElevateUserDto } from './dtos/elevate-user.dto';

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
    try {
      const res = await this.roomService.addRoom(
        (request as any)?.user?.id,
        room,
      );
      return response.status(res.status).json(res.message);
    } catch (e) {
      return response
        .status(e?.status ?? 500)
        .json(e?.message ?? 'Internal Server Error');
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('join')
  async joinRoom(
    @Req() request: Request,
    @Body() room: JoinRoomDto,
    @Res() response: ExpressResponse,
  ) {
    try {
      const res = await this.roomService.joinRoom(
        (request as any)?.user?.id,
        room,
      );
      return response.status(res.status).json(res.message);
    } catch (e) {
      return response
        .status(e?.status ?? 500)
        .json(e?.message ?? 'Internal Server Error');
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('ban')
  async banUserFromRoom(
    @Body() info: banUserDto,
    @Req() request: Request,
    @Res() response: ExpressResponse,
  ) {
    try {
      const res = await this.roomService.banUserFromRoom(
        (request as any)?.user?.id,
        info,
      );
      return response.status(res.status).json(res.message);
    } catch (e) {
      return response
        .status(e?.status ?? 500)
        .json(e?.message ?? 'Internal Server Error');
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
    try {
      const res = await this.roomService.muteUserInRoom(
        (request as any)?.user?.id,
        room,
      );
      return response.status(res.status).json(res.message);
    } catch (e) {
      return response
        .status(e?.status ?? 500)
        .json(e?.message ?? 'Internal Server Error');
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllRooms(@Req() request: Request, @Res() response: ExpressResponse) {
    try {
      const res = await this.roomService.getAllRooms(
        (request as any)?.user?.id,
      );
      return response.status(res.status).json(toObject.call(res?.data));
    } catch (e) {
      console.log('e: ', e?.status);
      return response
        .status(e?.status ?? 500)
        .json(e?.message ?? 'Internal Server Error');
    }
  }

  // //TODO: when getting the list of users also check for the blocked when because they should be hidden in the frontend
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('individual/:id')
  async getSpecificRoom(
    @Param('id') roomName: string,
    @Req() request: Request,
    @Res() response: ExpressResponse,
    @Query() query: PaginationQueryDto,
  ) {
    try {
      const res = await this.roomService.getSpecificRoom(
        query,
        roomName,
        (request as any)?.user?.id,
      );
      return response.status(res.status).json(toObject.call(res?.data));
    } catch (e) {
      console.log('e: ', e?.status);
      return response
        .status(e?.status ?? 500)
        .json(e?.message ?? 'Internal Server Error');
    }
  }
  // TODO: invite, makeAdmin

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('kick/:room/:user')
  async kickUserFromRoom(
    @Param('room') room: string,
    @Param('user') userToBeKicked: string,
    @Req() request: Request,
    @Res() response: ExpressResponse,
  ) {
    try {
      const res = await this.roomService.kickUserFromRoom(
        (request as any)?.user?.id,
        room,
        userToBeKicked,
      );
      if (res) return response.status(res.status).json(res.message);
    } catch (e) {
      return response
        .status(e?.status ?? 500)
        .json(e?.message ?? 'Internal Server Error');
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('protect')
  async protectRoom(
    @Body() protectRoomDto: ProtectRoomDto,
    @Req() request: Request,
    @Res() response: ExpressResponse,
  ) {
    try {
      const res = await this.roomService.protectRoom(
        (request as any)?.user?.id,
        protectRoomDto,
      );
      if (res) return response.status(res.status).json(res.message);
    } catch (e) {
      return response
        .status(e?.status ?? 500)
        .json(e?.message ?? 'Internal Server Error');
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('elevate')
  async makeUserAdmin(
    @Body() elevateUserDto: ElevateUserDto,
    @Req() request: Request,
    @Res() response: ExpressResponse,
  ) {
    try {
      const res = await this.roomService.makeUserAdmin(
        (request as any)?.user?.id,
        elevateUserDto,
      );
      if (res) return response.status(res.status).json(res.message);
    } catch (e) {
      return response
        .status(e?.status ?? 500)
        .json(e?.message ?? 'Internal Server Error');
    }
  }
}
