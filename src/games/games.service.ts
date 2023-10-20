import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { MoveDto } from './dto/move.dto';
import { generateGameId, randomizeMap } from './helpers';
import { PongEngine } from './pong/pong.engine';
import { MapEnum } from './types/map-enum.type';

@Injectable()
export class GamesService {
  constructor(/* private readonly authService : AuthService */) {}

  private games = new Map<string, PongEngine>();
  private matchingQueue: {
    client: Socket;
    id: string;
    map: MapEnum;
  }[] = [];
  private readonly lobby = new Map<string, Socket>();
  private invites: { from: string; to: string; map: MapEnum }[] = [];

  async join(client: Socket, map: MapEnum) {
    let id = this.getIdBySocket(client);
    if (!id) return;

    console.log('tried to join queue ==> id: ', id);

    if (this.matchingQueue.find((p) => p.id === id) || this.isPlaying(id)) {
      client.emit('error', `player already joined`);
      client.emit('cancel-join', {});
      console.log('player already joined');
      return;
    }
    console.log(`player ${id} joined queue`);
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
    id = generateGameId();
    this.games.set(id, game);
    console.log('game created');
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
        console.log('game found: game game game');
        return game;
      }
    });
    return null;
  }
  
  handleMove(client: Socket, moveDto: MoveDto): void {
    // console.log('handleMove: ', moveDto);
    let resGame:  PongEngine | null = null;
    this.games.forEach((game) => {
      if (game.client1?.id === client.id || game.client2?.id === client.id) {
        resGame = game;
      }
    });
  
    // let game: PongEngine = this.getGameBySocket(client);
    // console.log('game: ', game);
    // console.log('getGameBySocket: ', this.games);
    if (!resGame) return;
    // console.log('move: ', moveDto);
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

    this.handleAlreadyInGame(id, client);
  }

  handleLeftGame(client: Socket): void {
    const id = this.getIdBySocket(client);
    if (!id) {
      client.emit('error', `Something went wrong`);
    }

    // this.handleAlreadyInGame(id, client)
    //todo
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
      }
    });

    this.invites = this.invites.filter((i) => i.from !== id && i.to !== id);
    opponent && opponent.emit('opponent-left', {});
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

  leave(client: Socket): void {
    const id = this.getIdBySocket(client);
    if (!id) return;
    let game: PongEngine | undefined;
    console.log('searching for game...');
    this.games.forEach((value: PongEngine) => {
      if (value.firstPlayer === id || value.secondPlayer === id) {
        game = value;
        console.log('game found');
        return;
      }
    });
    if (!game){ console.log('game not found');return;}
    console.log('before resign');
    game.resign(id);
    this.cleanupSingleGame(game.gameId);
  }

  private isPlaying(id: string): boolean {
    this.games.forEach((game) => {
      if (game.gameHas(id)) return true;
    });
    return false;
  }

  private getIdBySocket(client: Socket): string | null {
    let id: string | null = null;
    this.lobby.forEach((value: any, key: string) => {
      if (value.id === client.id) {
        id = key;
      }
    });
    return id;
  }
}
