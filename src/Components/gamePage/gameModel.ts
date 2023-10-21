import Matter, { Body } from "matter-js";
import { Socket } from "socket.io-client";

class GameModel {
  runner: Matter.Runner;
  engine: Matter.Engine;
  world: Matter.World;
  rendrer: Matter.Render;
  element: HTMLElement;
  ar: number = 750 / 650;
  width: number;
  height: number;
  player1: Matter.Body = Matter.Bodies.rectangle(0, 0, 0, 0);
  player2: Matter.Body = Matter.Bodies.rectangle(0, 0, 0, 0);
  ball: Matter.Body = Matter.Bodies.circle(0, 0, 0);
  center: Matter.Body = Matter.Bodies.rectangle(0, 0, 0, 0);
  obstacles: Matter.Body[] = [];
  socket: Socket | null = null;
  mouse: Matter.Mouse;
  mouseConstraint: Matter.MouseConstraint;

  constructor(element: HTMLElement, map: string, socket: Socket | null = null) {
    this.element = element;
    this.engine = Matter.Engine.create({ gravity: { x: 0, y: 0 } });
    this.world = this.engine.world;
    this.socket = socket;
    [this.width, this.height] = this.calculateWidthHeight();
    this.rendrer = Matter.Render.create({
      element: this.element,
      engine: this.engine,
      options: {
        width: this.width,
        height: this.height,
        wireframes: false,
        background: "#260323",
      },
    });

    this.mouse = Matter.Mouse.create(this.rendrer.canvas);
    Matter.Mouse.setElement(this.mouse, element);
    this.mouseConstraint = Matter.MouseConstraint.create(this.engine, {
      mouse: this.mouse,
    });
    this.createObstacles(map);
    this.createWorld();
    this.generateEvents();
    // this.addBallToWorld();
    // this.addEventListeners(this.rendrer.canvas);
    this.runner = Matter.Runner.create();
    Matter.Render.run(this.rendrer);
    Matter.Runner.run(this.runner, this.engine);
  }

  private normalize(
    value: number,
    min1: number,
    max1: number,
    min2: number,
    max2: number
  ): number {
    return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
  }

  private _calculateScale(): number {
    let scale: number = this.width / 650;
    let scale2: number = this.height / 750;

    return Math.min(scale, scale2);
  }
  private generateEvents(): void {
    Matter.Events.on(this.engine, "beforeUpdate", (event: any) => {
      let x: number = this.mouse.position.x;
      let min: number = this.normalize(150 / 2, 0, this.width, 0, 650) - 5;
      let max: number = this.width - min + 10;
      console.log("mouse x", this.mouse.position.x);
      if (x >= min && x <= max) {
        this.socket?.emit("movePlayer", {
          x:
            this.normalize(this.mouse.position.x, 0, this.width, 0, 650) -
            this.normalize(25, 0, this.width, 0, 650),
        });
        // Body.setPosition(this.player1, {
        //   x: this.mouse.position.x,
        //   y: this.player1.position.y,
        // });
      }
    });
  }

  private createWorld(): void {
    this.player1 = Matter.Bodies.rectangle(
      this.normalize(325, 0, 650, 0, this.width),
      this.normalize(735, 0, 750, 0, this.height),
      this.normalize(150, 0, 650, 0, this.width),
      this.normalize(13, 0, 750, 0, this.height),
      {
        isStatic: true,
        render: { fillStyle: "#ffffff" },
        // chamfer: { radius: 6.5 },
      }
    );
    this.player2 = Matter.Bodies.rectangle(
      this.normalize(325, 0, 650, 0, this.width),
      this.normalize(15, 0, 750, 0, this.height),
      this.normalize(150, 0, 650, 0, this.width),
      this.normalize(13, 0, 750, 0, this.height),
      {
        isStatic: true,
        render: { fillStyle: "#ffffff" },
        // chamfer: { radius: 6.5 },
      }
    );
    this.center = Matter.Bodies.rectangle(
      this.normalize(325, 0, 650, 0, this.width),
      this.normalize(375, 0, 750, 0, this.height),
      this.normalize(620, 0, 650, 0, this.width),
      this.normalize(5, 0, 750, 0, this.height),
      {
        isStatic: true,
        render: { fillStyle: "#ffffff" },
        // chamfer: { radius: 3 },
      }
    );
    this.ball = Matter.Bodies.circle(
      this.width / 2,
      this.height / 2,
      15 * this._calculateScale(),
      { isStatic: true, render: { fillStyle: "#ffffff" } }
    );
    Matter.World.add(this.world, [
      this.player1,
      this.player2,
      this.center,
      this.ball,
    ]);
  }

  private createObstacles(map: string): void {
    if (map === "normal") return;
    if (map === "hard") {
      this.obstacles.push(
        Matter.Bodies.rectangle(
          this.width,
          this.normalize(187, 0, 750, 0, this.height),
          this.normalize(190, 0, 650, 0, this.width),
          this.normalize(30, 0, 750, 0, this.height),
          { isStatic: true, render: { fillStyle: "#FFFF00" } }
        )
      );
      this.obstacles.push(
        Matter.Bodies.rectangle(
          0,
          this.normalize(315, 0, 750, 0, this.height),
          this.normalize(190, 0, 650, 0, this.width),
          this.normalize(30, 0, 750, 0, this.height),
          { isStatic: true, render: { fillStyle: "#FFFF00" } }
        )
      );
      this.obstacles.push(
        Matter.Bodies.rectangle(
          0,
          this.normalize(564, 0, 750, 0, this.height),
          this.normalize(190, 0, 650, 0, this.width),
          this.normalize(30, 0, 750, 0, this.height),
          { isStatic: true, render: { fillStyle: "#FFFF00" } }
        )
      );
      this.obstacles.push(
        Matter.Bodies.rectangle(
          this.width,
          this.normalize(440, 0, 750, 0, this.height),
          this.normalize(190, 0, 650, 0, this.width),
          this.normalize(30, 0, 750, 0, this.height),
          { isStatic: true, render: { fillStyle: "#FFFF00" } }
        )
      );
      Matter.World.add(this.world, this.obstacles);
    }
    if (map === "expert") {
      this.obstacles.push(
        Matter.Bodies.rectangle(
          this.width,
          this.normalize(187, 0, 750, 0, this.height),
          this.normalize(190, 0, 650, 0, this.width),
          this.normalize(30, 0, 750, 0, this.height),
          { isStatic: true, render: { fillStyle: "#FFFF00" } }
        )
      );
      this.obstacles.push(
        Matter.Bodies.rectangle(
          0,
          this.normalize(315, 0, 750, 0, this.height),
          this.normalize(390, 0, 650, 0, this.width),
          this.normalize(30, 0, 750, 0, this.height),
          { isStatic: true, render: { fillStyle: "#FFFF00" } }
        )
      );
      this.obstacles.push(
        Matter.Bodies.rectangle(
          0,
          this.normalize(564, 0, 750, 0, this.height),
          this.normalize(190, 0, 650, 0, this.width),
          this.normalize(30, 0, 750, 0, this.height),
          { isStatic: true, render: { fillStyle: "#FFFF00" } }
        )
      );
      this.obstacles.push(
        Matter.Bodies.rectangle(
          this.width,
          this.normalize(440, 0, 750, 0, this.height),
          this.normalize(390, 0, 650, 0, this.width),
          this.normalize(30, 0, 750, 0, this.height),
          { isStatic: true, render: { fillStyle: "#FFFF00" } }
        )
      );
      Matter.World.add(this.world, this.obstacles);
    }
  }

  public calculateWidthHeight(): [number, number] {
    let width: number, height: number;
    if (this.element.clientWidth < this.element.clientHeight) {
      width = this.element.clientWidth;
      height = (width * 1) / this.ar;
      if (height > this.element.clientHeight) {
        height = this.element.clientHeight;
        width = height * this.ar;
      }
    } else {
      height = this.element.clientHeight;
      width = height * this.ar;
      if (width > this.element.clientWidth) {
        width = this.element.clientWidth;
        height = (width * 1) / this.ar;
      }
    }
    return [width, height];
  }

  public updateState(data: any) {
    if (this.player1 && this.player2 && this.ball) {
      Matter.Body.setPosition(this.player1, {
        x: this.normalize(data.userPaddle, 0, 650, 0, this.width),
        y: this.player1.position.y,
      });
      // console.log('opponentPaddle: ..... ->', data.opponentPaddle.x);
      // Matter.World.add(this.world, this.ball);
      Matter.Body.setPosition(this.player2, {
        x: this.normalize(data.opponentPaddle, 0, 650, 0, this.width),
        y: this.player2.position.y,
      });
      Matter.Body.setPosition(this.ball, {
        x: this.normalize(data.ball.x, 0, 650, 0, this.width),
        y: this.normalize(data.ball.y, 0, 750, 0, this.height),
      });
    }
  }

  public destroy(): void {
    this.rendrer.canvas.remove();
    Matter.Runner.stop(this.runner);
    Matter.Engine.clear(this.engine);
    Matter.Render.stop(this.rendrer);
  }

  public addBallToWorld(): void {
    Matter.World.add(this.world, this.ball);
  }
}

export default GameModel;
