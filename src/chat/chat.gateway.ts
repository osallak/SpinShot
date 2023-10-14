import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';
import { Logger, ValidationPipe, UseGuards } from '@nestjs/common';
import { WsBadRequestException } from './exceptions/ws-exceptions';
import { ValidationError } from 'class-validator';
import { SendMessageDto, sendRoomMessageDto } from './dtos/send-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CHAT_PORT,
  OPTIONS,
  INVALID_DATA_MESSAGE,
  PRIVATE_MESSAGE,
  GROUP_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
} from './chat.configuration';

import { WsGuard } from './chat.guard';

@WebSocketGateway(OPTIONS)
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
    this.chatService.addUserToWorld(client);
  }

  handleDisconnect(client: Socket) {
    return this.chatService.deleteUserFromWorld(client);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage(GROUP_MESSAGE)
  async handleGroupMessage(
    @MessageBody(
      new ValidationPipe({
        exceptionFactory: (errors: ValidationError[]) => {
          return new WsBadRequestException(INVALID_DATA_MESSAGE);
        },
      }),
    )
    body: sendRoomMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    try {
      return await this.chatService.sendGroupMessage(body);
    } catch (e) {
      socket.emit(
        e.event,
        JSON.stringify({
          status: e.status,
          message: e.message,
        }),
      );
    }
  }
}
