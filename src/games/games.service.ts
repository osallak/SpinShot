import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Socket } from 'socket.io';
import { MoveDto } from './dto/move.dto';
import { generateGameId, randomizeMap } from './helpers';
import { PongEngine } from './pong/pong.engine';
import { MapEnum } from './types/map-enum.type';
import { UserStatus } from '@prisma/client';
import { MapSelectionDto } from './dto/map-selection.dto';

@Injectable()
export class GamesService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  games = new Map<string, PongEngine>();
   matchingQueue: {
    client: Socket;
    id: string;
    map: MapEnum;
  }[] = [];
   lobby = new Map<string, Socket>();
   invites: { from: string; to: string; map: MapEnum }[] = [];

  async join(client: Socket, map: MapEnum) {
    let id = this.getIdBySocket(client);
    if (!id) return;

    if (this.matchingQueue.find((p) => p.id === id) || this.isPlaying(id)) {
      client.emit('error', `player already joined`);
      client.emit('cancel-join', {});
      return;
    }
    this.matchingQueue.push({ id, client, map });

    if (this.matchingQueue.length < 2) return;

    let firstPlayer = this.matchingQueue.find(
      (p) => p.map === map && p.id !== id,
    );
    if (!firstPlayer) return;

    this.matchingQueue = this.matchingQueue.filter((element) => {
      return element.id !== firstPlayer?.id && element.id !== id;
    });
    const gameOptions = {
      map: firstPlayer.map,
      firstPlayerId: firstPlayer.id,
      secondPlayerId: id,
      firstClient: firstPlayer.client,
      secondClient: client,
    };

    const game = new PongEngine(gameOptions);
    game.gameId = generateGameId();
    game.cleanUpGameService = this.cleanupSingleGame.bind(this);
    game.saveGameCallback = this.saveGame.bind(this);
    this.games.set(game.id, game);
    this.eventEmitter.emit('userUpdate', {status: UserStatus.INGAME, id: gameOptions.firstPlayerId});
    this.eventEmitter.emit('userUpdate', {status: UserStatus.INGAME, id: gameOptions.secondPlayerId});
    game.play();
  }

  handleCancelJoin(client: Socket): void {
    const id = this.getIdBySocket(client);
    if (!id) return;

    this.matchingQueue = this.matchingQueue.filter((p) => p.id !== id);
  }

  private getGameBySocket(client: Socket): PongEngine | null {
    this.games.forEach((game) => {
      if (game.client1?.id === client.id || game.client2?.id === client.id) {
        return game;
      }
    });
    return null;
  }

  handleMove(client: Socket, moveDto: MoveDto): void {
    let resGame: PongEngine | null = null;
    this.games.forEach((game) => {
      if (game.client1?.id === client.id || game.client2?.id === client.id) {
        resGame = game;
      }
    });

    if (!resGame) return;
    resGame.move(this.getIdBySocket(client), moveDto.x);
  }

  async handleInvite(senderClient: Socket, id: string) {
    const senderId = this.getIdBySocket(senderClient);
    if (!senderId) return;
    if (this.isPlaying(id) || this.isPlaying(senderId)) {
      senderClient.emit(
        'error',
        `Player already in a game, please try again later`,
      );
      senderClient.emit('cancel-invite', {});
      return;
    }

    const reciever = this.lobby.get(id);
    if (!reciever) {
      senderClient.emit('error', `Player is not connected`);
      senderClient.emit('invite-canceled', {});
      return;
    }

    this.invites.push({
      from: senderId,
      to: id,
      map: randomizeMap(),
    });

    setTimeout(() => {
      this.invites = this.invites.filter(
        (i) => i.from !== senderId && i.to !== id,
      );
    }, 20000);

    reciever.emit('invite', { id });
  }

  async acceptInvite(recieverClient: Socket, id: string) {
    if (!id) return;
    const senderClient = this.lobby.get(id);
    if (!senderClient) {
      recieverClient.emit(
        'error',
        `Player is not connected, please try again later`,
      );
      return;
    }
    const recieverId = this.getIdBySocket(recieverClient);
    const request = this.invites.find(
      (i) => i.from === id && i.to === recieverId,
    );
    if (!request) {
      recieverClient.emit('error', 'Invite not found');
      return;
    }

    this.invites.splice(this.invites.indexOf(request), 1);
    senderClient.emit('invite-accepted', {});
    recieverClient.emit('invite-accepted', {});
    const gameId = generateGameId();
    const gameOptions = {
      firstPlayerId: id,
      secondPlayerId: recieverId,
      firstClient: senderClient,
      secondClient: recieverClient,
      map: request.map,
    };
    const game = new PongEngine(gameOptions);
    game.cleanUpGameService = this.cleanupSingleGame.bind(this);

    this.games.set(gameId, game);
    game.play();
  }

  handleCancelInvite(client: Socket): void {
    const id = this.getIdBySocket(client);
    if (!id) return;
    const senderId = this.getIdBySocket(client);
    if (!senderId) return;

    this.invites = this.invites.filter(
      (i) => i.from !== senderId && i.to !== id,
    );
    const recieverClient = this.lobby.get(id);
    const senderClient = this.lobby.get(senderId);
    if (recieverClient) recieverClient.emit('invite-canceled', {});
    if (senderClient) senderClient.emit('invite-canceled', {});
  }

  handleDeclineInvite(recieverClient: Socket, id: string): void {
    if (!id) return;
    const senderId = this.getIdBySocket(recieverClient);
    if (!senderId) return;

    this.invites = this.invites.filter(
      (i) => i.from !== senderId && i.to !== id,
    );
    const sendeClient = this.lobby.get(id);
    recieverClient && recieverClient.emit('invite-canceled', {});
    sendeClient && sendeClient.emit('invite-canceled', {});
  }

  connect(client: Socket, id: string): void {
    this.lobby.set(id, client);
    // this.eventEmitter.emit('userUpdate', {status: UserStatus.ONLINE, id});

    this.handleAlreadyInGame(id, client);
  }

  handleDisconnect(client: Socket): void {
    let opponent: Socket | null = null;
    if (!client) return;
  
    let id = this.getIdBySocket(client);
    if (!id) return;

    this.lobby.delete(id);

    this.matchingQueue = this.matchingQueue.filter((p) => p.id !== id);

    this.lobby[id] = null;
    this.games.forEach((game: PongEngine) => {
      if (game.firstPlayer === id) {
        opponent = game.client2;
        game.client1 = null;
      }
      if (game.secondPlayer === id) {
        opponent = game.client1;
        game.client2 = null;
        game.resign(id);
      }
    });

    this.eventEmitter.emit('userUpdate', {status: UserStatus.OFFLINE, id});
    this.invites = this.invites.filter((i) => i.from !== id && i.to !== id);
  }

  handleAlreadyInGame(id: string, client: Socket): boolean {
    let game: PongEngine | undefined;
    this.games.forEach((value: PongEngine) => {
      if (value.firstPlayer === id || value.secondPlayer === id) {
        game = value;
      }
    });
    if (game) {
      game.reconnect(id, client);
      return true;
    }
    return false;
  }

  public cleanupSingleGame(id: string): void {
    const game = this.games.get(id);
    if (!game) {
      return;
    }
    this.games.delete(id);
  }

  // leave(client: Socket): void {
  //   const id = this.getIdBySocket(client);
  //   if (!id) return;
  //   let game: PongEngine | undefined;
  //   this.games.forEach((value: PongEngine) => {
  //     if (value.firstPlayer === id || value.secondPlayer === id) {
  //       game = value;
  //       return;
  //     }
  //   });
  //   if (!game) {
  //     return;
  //   }
  //   game.resign(id);
  //   this.cleanupSingleGame(game.gameId);
  // }

  private isPlaying(id: string): boolean {
    this.games.forEach((game) => {
      if (game.gameHas(id)) return true;
    });
    return false;
  }

  getIdBySocket(client: Socket): string | null {
    let id: string | null = null;
    this.lobby.forEach((value: any, key: string) => {
      if (value.id === client.id) {
        id = key;
      }
    });
    return id;
  }

  private saveGame(game: any): void {
    this.eventEmitter.emit('saveGame', game);
    this.eventEmitter.emit('userUpdate', {status: UserStatus.ONLINE, id: game.userId});
    this.eventEmitter.emit('userUpdate', {status: UserStatus.ONLINE, id: game.opponentId});
  }
}
