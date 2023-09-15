import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dtos/create-room.dto';

@Injectable()
export class RoomService {
  constructor(private readonly prismaService: PrismaService) {}

	async createRoom(room: CreateRoomDto) {
		
	}
}
