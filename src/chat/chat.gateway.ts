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
import { OPTIONS, PORT, PRIVATE_MESSAGE } from './chat.configuration';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { WsBadRequestException } from './exceptions/ws-exceptions';
import { ValidationError } from 'class-validator';
import { SendMessageDto } from './dtos/SendMessageDto.dto';
import { WsExceptionFilter } from './exceptions/ws-exceptions';

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

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage(PRIVATE_MESSAGE)
  handlePrivateMessage(
    @MessageBody() body: SendMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {}

  handleConnection(client: Socket) {
    this.chatService.addUserToWorld(client);
  }

  handleDisconnect(client: Socket) {
    this.chatService.deleteUserFromWorld(client);
  }
}
