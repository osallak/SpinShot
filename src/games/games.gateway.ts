import { Logger, UseFilters, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UserStatus } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Server, Socket } from 'socket.io';
import { MapSelectionDto } from './dto/map-selection.dto';
import { MoveDto } from './dto/move.dto';
import { WebsocketExceptionsFilter } from './filter/ws.filter';
import { GamesService } from './games.service';
import { WsJwtGuard } from './guard/ws.guard';
import { SocketAuthMidleware } from './middleware/ws.mw';

@WebSocketGateway({
  cors: '*',
  namespace: 'games',
})
@UseGuards(WsJwtGuard)
@UseFilters(WebsocketExceptionsFilter)
export class GamesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger('GamesGateway');

  constructor(
    private readonly gamesService: GamesService,
    private readonly prismaService: PrismaService,
  ) {}

  extractClient(client: Socket): string | null {
    // const { authorization } = client?.handshake?.headers;
    // client.handshake.
    const token = client.handshake.auth['token'];
    if (!token) throw new Error('jwt malformed');
    // if (!authorization) throw new Error('jwt malformed');
    const payload = WsJwtGuard.validateToken(client);
    return payload.sub ?? null;
  }

  handleConnection(client: Socket) {
    const id = this.extractClient(client);
    if (!id) {
      client.disconnect();
      return;
    }


    this.logger.log(`user ${id} connected`);
    this.gamesService.connect(client, id);
  }

  async handleDisconnect(client: Socket) {
    this.gamesService.handleDisconnect(client);
    const id  = this.extractClient(client);
    if (!id) return;

    this.logger.log(`user ${id} disconnected`);
    try {
      await this.prismaService.user.update({where: {id}, data: {status: UserStatus.OFFLINE}});
    } catch(error) {}
  }

  afterInit(client: Socket) {
    this.logger.log('GamesGateway initialized');
    client.use(SocketAuthMidleware() as any);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('joinQueue')
  join(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: MapSelectionDto,
  ): void {
    this.gamesService.join(client, data.map);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('leaveQueue')
  leaveQueue(@ConnectedSocket() client: Socket): void {
    this.gamesService.handleCancelJoin(client);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('movePlayer')
  move(
    @ConnectedSocket() client: Socket,
    @MessageBody() moveDto: MoveDto,
  ): void {
    this.gamesService.handleMove(client, moveDto);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('invite')
  invite(@ConnectedSocket() client: Socket, @MessageBody() data: any): void {
    if (data && data.id)
      this.gamesService.handleInvite(client, data.id);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('accept-invite')
  acceptInvite(@ConnectedSocket() client: Socket, @MessageBody() data: { id: string }): void {
    this.gamesService.acceptInvite(client, data.id);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('cancel-invite')
  cancelInvite(@ConnectedSocket() client: Socket): void {
    this.gamesService.handleCancelInvite(client);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('decline-invite')
  declineInvite(@ConnectedSocket() client: Socket, @MessageBody() data: { id: string }): void {
    if (!data || !data.id) return;
    this.gamesService.handleDeclineInvite(client, data.id);
  }
}
