import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';
import { Logger, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { WsBadRequestException } from './exceptions/ws-exceptions';
import { ValidationError } from 'class-validator';
import { SendMessageDto } from './dtos/send-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CHAT_PORT,
  OPTIONS,
  INVALID_DATA_MESSAGE,
  PRIVATE_MESSAGE,
  GROUP_MESSAGE,
} from './chat.configuration';

import { WsGuard } from './chat.guard';

@WebSocketGateway(CHAT_PORT + 10, OPTIONS)
@UsePipes(
  new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) => {
      return new WsBadRequestException(INVALID_DATA_MESSAGE);
    },
  }),
)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server;

  private readonly logger: Logger = new Logger('Chat');

  constructor(
    private readonly chatService: ChatService,
    private readonly prismaService: PrismaService,
  ) {}

  @UseGuards(WsGuard)
  @SubscribeMessage(PRIVATE_MESSAGE)
  async handlePrivateMessage(
    @MessageBody() body: SendMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    return this.chatService.sendPrivateMessage(body);
  }

  async handleConnection(client: Socket) {
		this.logger.debug("new client: ", client.id);
    this.chatService.addUserToWorld(client);
  }

  handleDisconnect(client: Socket) {
    return this.chatService.deleteUserFromWorld(client);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage(GROUP_MESSAGE)
  async handleGroupMessage(
    @MessageBody() body: SendMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
		// return this.chatService.sendGroupMessage(body);
	}

	// TODO: remove this is for testing purposes
	@SubscribeMessage('hello')
	async test(@MessageBody() body: string, @ConnectedSocket() socket: Socket) {
		console.log(body);
		console.log(socket.id);
		socket.emit("hello", "sir t7wa");
	}
}
