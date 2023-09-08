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
import {
  EXCEPTION,
  OPTIONS,
  PORT,
  PRIVATE_MESSAGE,
} from './chat.configuration';
import { Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  WsBadRequestException,
  WsUnknownException,
} from './exceptions/ws-exceptions';
import { ValidationError } from 'class-validator';
import { SendMessageDto } from './dtos/SendMessageDto.dto';
import { WsExceptionFilter } from './exceptions/ws-exceptions';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendshipStatus } from '@prisma/client';
import { eventType } from './types/event.type';

@WebSocketGateway(PORT, OPTIONS)
@UseFilters(WsExceptionFilter)
@UsePipes(
  new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) => {
      return new WsBadRequestException('invalid data');
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

  @SubscribeMessage(PRIVATE_MESSAGE)
  async handlePrivateMessage(
    @MessageBody() body: SendMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    // user is blocked
    let isBlocked: Array<object> = undefined;
    try {
      isBlocked = await this.prismaService.friendship.findMany({
        where: {
          OR: [
            {
              user: {
                username: body.from,
              },
              state: FriendshipStatus.BLOCKED,
              friend: {
                username: body.to,
              },
            },
            {
              user: {
                username: body.to,
              },
              state: FriendshipStatus.BLOCKED,
              friend: {
                username: body.from,
              },
            },
          ],
        },
      });
    } catch (e) {
      this.logger.error(e);
    }
    const receiver = this.chatService.getSocketsAssociatedWithUser(body.to); // maybe the user is not present, push to if not muted notification
    if (!receiver) throw new WsUnknownException('user does not have sockets');
    let event: eventType = {
      event: PRIVATE_MESSAGE,
      content: body.content,
    };
    if (isBlocked.length > 0) {
      event = {
        event: EXCEPTION,
        content: 'user is blocked',
      };
    }
    for (let i = 0; i < receiver.length; ++i) {
      receiver[i].emit(event.event, event.content);
    }
  }

  handleConnection(client: Socket) {
    this.chatService.addUserToWorld(client);
  }

  handleDisconnect(client: Socket) {
    this.chatService.deleteUserFromWorld(client);
  }
}
