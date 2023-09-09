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
import { Logger, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  WsBadRequestException, WsUnauthorizedException,
} from './exceptions/ws-exceptions';
import { ValidationError } from 'class-validator';
import { SendMessageDto } from './dtos/SendMessageDto.dto';
import { WsExceptionFilter } from './exceptions/ws-exceptions';
import { PrismaService } from 'src/prisma/prisma.service';
import {PORT, OPTIONS, INVALID_DATA_MESSAGE, PRIVATE_MESSAGE} from './chat.configuration'
import { WsGuard } from './chat.guard';

@WebSocketGateway(PORT, OPTIONS)
@UseFilters(WsExceptionFilter)
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

  handleConnection(client: Socket) {
    return this.chatService.addUserToWorld(client);
  }

  handleDisconnect(client: Socket) {
    return this.chatService.deleteUserFromWorld(client);
  }
}
