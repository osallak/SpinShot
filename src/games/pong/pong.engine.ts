import Matter from 'matter-js';
import { Socket } from 'socket.io';
import { MapEnum } from '../types/map-enum.type';
import { MoveDirection } from '../types/walls-position.enum';
import {
  BALL_RADUIS,
  HEIGHT,
  WIDTH,
  ballSettings,
  obstaclesSettings,
} from './pong.settings';

type position = {
  x: number;
  y: number;
};

export class PongEngine {
  private readonly id: string;
  private engine: Matter.engine;
  private world: Matter.world;
  private runner: Matter.runner;
  private ball: Matter.body;
  private firstPaddle: Matter.body;
  private secondPaddle: Matter.body;
  private firstClient: Socket;
  private secondClient: Socket;
  private readonly firstPlayerId: string;
  private readonly secondPlayerId: string;
  private firstScore: number = 0;
  private secondScore: number = 0;
  private map: MapEnum;
  private Scored: boolean = false;
  private spawnUp: boolean = Math.random() > 0.5;
  private readonly width: number = WIDTH;
  private readonly height: number = HEIGHT;
  public cleanUpGameService: (id: string) => void | null = null;
  private Movement: {
    firstPlayer: {
      x: number;
      shouldMove: boolean;
    };
    secondPlayer: {
      x: number;
      shouldMove: boolean;
    };
  } = {
    firstPlayer: {
      x: 0,
      shouldMove: false,
    },
    secondPlayer: {
      x: 0,
      shouldMove: false,
    },
  };

  /*
    top: firstPaddle 
    buttom: secondPaddle
  */
  constructor(gameSettings: {
    firstClient: Socket;
    secondClient: Socket;
    firstPlayerId: string;
    secondPlayerId: string;
    map: MapEnum;
  }) {
    this.firstClient = gameSettings.firstClient;
    this.secondClient = gameSettings.secondClient;
    this.firstPlayerId = gameSettings.firstPlayerId;
    this.secondPlayerId = gameSettings.secondPlayerId;
    this.map = gameSettings.map;
    this.notifyPlayers(
      {
        firstClient: true,
        secondClient: true,
      },
      'match',
    );
  }

  private notifyPlayers(
    to: { firstClient: boolean; secondClient: boolean },
    type: 'match' | 'reconnect',
  ) {
    if (type === 'reconnect') {
      return;//todo: remove in production
    }
    if (to.firstClient && this.firstClient) {
      this.firstClient.emit(type, {
        opponnet: this.secondPlayerId,
        opponentScore: this.secondScore,
        userScore: this.firstScore,
        map: this.map,
        gameId: this.id,
      });
    }
    if (to.secondClient && this.secondClient) {
      this.secondClient.emit(type, {
        opponent: this.firstPlayerId,
        opponentScore: this.firstScore,
        userScore: this.secondScore,
        map: this.map,
        gameId: this.id,
      });
    }
  }
  public async play() {
    this.init(); //intialize the game
    this.listen(); //listen for events
    this.beforePlay();

    setTimeout(() => {
      this.throwBall(); //throw the ball
    }, 4500);
    Matter.Runner.run(this.runner, this.engine);
  }

  private beforePlay() {
    setTimeout(() => {
      this.client1.emit('countDown', '3');
      this.client2.emit('countDown', '3');
    }, 1000);

    setTimeout(() => {
      this.client1.emit('countDown', '2');
      this.client2.emit('countDown', '2');
    }, 2000);

    setTimeout(() => {
      this.client1.emit('countDown', '1');
      this.client2.emit('countDown', '1');
    }, 3000);

    setTimeout(() => {
      this.client1.emit('countDown', 'GO!');
      this.client2.emit('countDown', 'GO!');
    }, 4000);
  }

  private throwBall() {
    Matter.Body.applyForce(this.ball, this.ball.position, {
      x: this.spawnUp ? 1.5 : -1.5,
      y: this.spawnUp ? 1.5 : -1.5,
    });
    this.spawnUp = !this.spawnUp;
    Matter.World.add(this.engine.world, this.ball);
  }

  private init() {
    this.initMatter(); //engine world ...etc
    this.initMovingObjects(); //paddles and ball
    this.initStaticObjects(); //including obstacles/walls
  }

  private listen() {
    Matter.Events.on(this.engine, 'collisionStart', this.handleCollisionStart);
    Matter.Events.on(this.engine, 'afterUpdate', this.handleAfterUpdate);
  }

  private initMatter() {
    this.engine = Matter.Engine.create({
      gravity: {
        x: 0,
        y: 0,
      },
    });

    this.world = Matter.World.create();
    this.runner = Matter.Runner.create();
  }

  //ball, paddles
  private initMovingObjects() {
    this.firstPaddle = Matter.Bodies.rectangle(325, 15, 150, 13, {
      label: 'firstPaddle',
      isStatic: true,
      chamfer: { radius: 6.5 },
    });

    this.secondPaddle = Matter.Bodies.rectangle(325, 735, 150, 13, {
      label: 'secondPaddle',
      isStatic: true,
      chamfer: { radius: 6.5 },
    });

    // this.ball = Matter.Bodies.circle(400, 400, BALL_RADUIS, {
    //   label: 'ball',
    //   ...ballSettings,
    // });
    this.ball = Matter.Bodies.circle(
      this.width / 2,
      this.height / 2,
      BALL_RADUIS,
      {
        label: 'ball',
        ...ballSettings,
      },
    );

    Matter.World.add(this.engine.world, [this.firstPaddle, this.secondPaddle]);
  }

  //walls, obstacles
  private initStaticObjects() {
    //init borders
    const wallOptions = { isStatic: true };
    Matter.World.add(this.engine.world, [
      Matter.Bodies.rectangle(400, 0, 800, 20, {
        ...wallOptions,
        label: 'top',
      }),
      Matter.Bodies.rectangle(400, 750, 800, 20, {
        ...wallOptions,
        label: 'bottom',
      }),
      Matter.Bodies.rectangle(0, 300, 10, 890, {
        ...wallOptions,
        label: 'left',
      }),
      Matter.Bodies.rectangle(650, 10, 20, 2090, {
        ...wallOptions,
        label: 'right',
      }),
    ]);

    //init obstacles if any
    this.initObstacles();
  }

  private initObstacles() {
    const map = this.map;

    switch (map) {
      case 'hard':
        this.initConstantObstacles();
        this.initHardMap();
        break;
      case 'expert':
        this.initConstantObstacles();
        this.initExpertMap();
        break;
    }
  }

  private initHardMap() {
    Matter.World.add(this.engine.world, [
      Matter.Bodies.rectangle(0, 315, 190, 30, obstaclesSettings),
      Matter.Bodies.rectangle(650, 440, 190, 30, obstaclesSettings),
    ]);
  }

  private initExpertMap() {
    Matter.World.add(this.engine.world, [
      Matter.Bodies.rectangle(0, 315, 390, 30, obstaclesSettings),
      Matter.Bodies.rectangle(650, 440, 190, 30, obstaclesSettings),
    ]);
  }

  private initConstantObstacles() {
    Matter.World.add(this.engine.world, [
      Matter.Bodies.rectangle(650, 187, 190, 30, obstaclesSettings),
      Matter.Bodies.rectangle(0, 564, 190, 30, obstaclesSettings),
    ]);
  }

  private handleCollisionStart = (
    event: Matter.IEventCollision<Matter.Engine>,
  ) => {
    const pairs = event.pairs;
    const labels = [pairs[0].bodyA.label, pairs[0].bodyB.label];

    if (labels.includes('ball') && labels.includes('top')) {
      console.log('top Goal');
      this.goalScored(this.secondPlayerId);
      return;
    } else if (labels.includes('ball') && labels.includes('bottom')) {
      console.log('bottom Goal');
      this.goalScored(this.firstPlayerId);
      return;
    }
  };

  private handleAfterUpdate = (
    event: Matter.IEventCollision<Matter.Engine>,
  ) => {
    if (this.Movement.firstPlayer.shouldMove) {
      Matter.Body.setPosition(this.firstPaddle, {
        x: this.Movement.firstPlayer.x,
        y: this.firstPaddle.position.y,
      });
    }
    if (this.Movement.secondPlayer.shouldMove) {
      Matter.Body.setPosition(this.secondPaddle, {
        x: this.Movement.secondPlayer.x,
        y: this.secondPaddle.position.y,
      });
    }
      this.Movement.firstPlayer.shouldMove = false;
      this.Movement.secondPlayer.shouldMove = false;
      this.sendGameState();
  };

  private goalScored(playerId: string) {
    this.Scored = true; //todo: set to false when ball is added
    Matter.Composite.remove(this.engine.world, this.ball);

    playerId === this.firstPlayerId ? this.firstScore++ : this.secondScore++;

    if (this.firstScore >= 10 || this.secondScore >= 10) {
      this.gameOver(true);
      return;
    } else {
      this.ball = Matter.Bodies.circle(400, 400, BALL_RADUIS, {
        label: 'ball',
        ...ballSettings,
      });
      this.sendScore();
      setTimeout(() => {
        console.log('spawn ball');
        Matter.World.add(this.engine.world, this.ball);
      }, 2000);
    }
  }

  private gameOver(finished: boolean = true) {
    const gameOver = {
      firstScore: this.firstScore,
      secondScore: this.secondScore,
      winner:
        this.firstScore > this.secondScore
          ? this.firstPlayerId
          : this.secondPlayerId,
    };

    console.log('firstClient: ', this.firstClient.id);
    console.log('second: ', this.secondClient.id);
    this.firstClient.emit('gameOver', gameOver);
    this.secondClient.emit('gameOver', gameOver);
    console.log('game over');
    //cleanup the game

    Matter.Events.off(this.engine, 'collisionStart', this.handleCollisionStart);
    Matter.Events.off(this.engine, 'afterUpdate', this.handleAfterUpdate);
  }

  private sendScore() {
    const scoreUpdate = {
      firstPlayer: this.firstScore,
      secondPlayer: this.secondScore,
    };

    this.firstClient && this.firstClient.emit('scoreUpdate', scoreUpdate);
    this.secondClient && this.secondClient.emit('scoreUpdate', scoreUpdate);
  }

  private sendGameState() {
    const firstGameState = {
      ball: this.normalizePosition(this.ball.position),
      opponentPaddle: this.normalizePosition(this.secondPaddle.position).x,
      yourScore: this.firstScore,
      opponentScore: this.secondScore,
    };

    const secondGameState = {
      ball: this.ball.position,
      opponentPaddle: this.firstPaddle.position.x,
      userScore: this.secondScore,
      opponentScore: this.firstScore,
    };

    this.firstClient && this.firstClient.emit('gameState', firstGameState);
    this.secondClient && this.secondClient.emit('gameState', secondGameState);
  }

  private normalizePosition(position: { x: number; y: number }) {
    return {
      x: WIDTH - position.x,
      y: HEIGHT - position.y,
    };
  }

  get firstPlayer() {
    return this.firstPlayerId;
  }

  get secondPlayer() {
    return this.secondPlayerId;
  }

  public gameHas(playerId: string) {
    return playerId in [this.firstPlayerId, this.secondPlayerId];
  }

  set client1(client: Socket) {
    this.firstClient = client;
  }

  set client2(client: Socket) {
    this.firstClient = client;
  }

  get client1() {
    return this.firstClient;
  }

  get client2() {
    return this.secondClient;
  }

  get gameId() {
    return this.id;
  }

  public reconnect(id: string, client: Socket) {
    if (this.firstPlayerId === id) {
      this.firstClient = client;
    } else if (this.secondPlayerId === id) {
      this.secondClient = client;
    }
    this.notifyPlayers(
      {
        firstClient: this.firstClient ? true : false,
        secondClient: this.secondClient ? true : false,
      },
      'reconnect',
    );
  }

  public move(id: string, newX: MoveDirection) {
    if (!id) {
      this.gameOver(false); //false means the game is aborted
      return;
    }

    if (id === this.firstPlayerId) {
      this.Movement.firstPlayer.x = newX;
      this.Movement.firstPlayer.shouldMove = true;
    } else if (id === this.secondPlayerId) {
      this.Movement.secondPlayer.x = newX;
      this.Movement.secondPlayer.shouldMove = true;
    }
  }

  // private throwBall() {
  //   this.ball = Matter.Bodies.circle(
  //     this.width / 2,
  //     this.height / 2,
  //     BALL_RADUIS,
  //     {
  //       label: 'ball',
  //       ...ballSettings,
  //       force: { x: -1.5, y: -1.5 },
  //     },
  //   );
  // }

  public resign(id: string) {
    switch (id) {
      case this.firstPlayerId:
        this.firstScore = 0;
        this.secondScore = 10;
        break;
      case this.secondPlayerId:
        this.secondScore = 0;
        this.firstScore = 10;
        break;
      default: {
        return;
      }
    }
    this.gameOver();
  }
}
