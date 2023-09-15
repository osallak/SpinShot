import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards";
import { RoomService } from "./room.service";
import { CreateRoomDto } from "./dtos/create-room.dto";

@ApiTags('room')
@Controller('room')
export class RoomController {
	// constructor(private readonly roomService: RoomService)
	@UseGuards(JwtAuthGuard)
	@Post('add')
	async createRoom(@Body() room: CreateRoomDto) {
		// return await this.roomService.createRoom(room);
	}
}