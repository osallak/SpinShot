import { Logger, UseFilters, UseGuards, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { ValidationError } from 'class-validator';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  GROUP_MESSAGE,
  INVALID_DATA_MESSAGE,
  OPTIONS,
  PRIVATE_MESSAGE
} from './chat.configuration';
import { ChatService } from './chat.service';
import { SendMessageDto, sendRoomMessageDto } from './dtos/send-message.dto';
import {
  WsBadRequestException,
  WsExceptionsFilter,
} from './exceptions/ws-exceptions';

import { WsGuard } from './chat.guard';

@UseFilters(WsExceptionsFilter)
@WebSocketGateway(OPTIONS)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server;

  private readonly logger: Logger = new Logger('ChatGateway');

  constructor(
    private readonly chatService: ChatService,
    private readonly prismaService: PrismaService,
  ) {}

  @UseGuards(WsGuard)
  @SubscribeMessage(PRIVATE_MESSAGE)
  async handlePrivateMessage(
    @MessageBody(
      new ValidationPipe({
        exceptionFactory: (errors: ValidationError[]) => {
          return new WsBadRequestException(INVALID_DATA_MESSAGE);
        },
      }),
    )
    body: SendMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log('pm :', socket.id);
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
      console.log("gm:", body);
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
