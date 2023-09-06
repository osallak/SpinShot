import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';
import { OPTIONS, PORT } from './chat.configuration';

@WebSocketGateway(PORT, OPTIONS)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    this.chatService.addUserToWorld(client);
  }

  handleDisconnect(client: Socket) {
		this.chatService.deleteUserFromWorld(client);
	}
}
