import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import {
  NOTIFICATION_OPTIONS,
  NOTIFICATION_PORT,
} from './notification.configuration';
import { Socket } from 'socket.io';

@WebSocketGateway(NOTIFICATION_PORT, NOTIFICATION_OPTIONS)
export class notificationGateway {
  @SubscribeMessage('hi')
  handleMessage(
    @MessageBody() content: any,
    @ConnectedSocket() socket: Socket,
  ) {
    return 'hi';
  }
}