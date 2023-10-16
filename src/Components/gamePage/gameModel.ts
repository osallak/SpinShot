import Matter, { Body, Events, Vector } from "matter-js";
import { Socket } from "socket.io-client";

class GameModel{
    engine: Matter.Engine;
    world: Matter.World;
    rendrer: Matter.Render;
    element: HTMLElement;
    ar: number = 750 / 650;
    width: number;
    height: number;
    player1: Matter.Body = Matter.Bodies.rectangle(0, 0, 0, 0);
    player2: Matter.Body = Matter.Bodies.rectangle(0, 0, 0, 0);
    ball: Matter.Body = Matter.Bodies.rectangle(0, 0, 0, 0);
    center: Matter.Body = Matter.Bodies.rectangle(0, 0, 0, 0);
    obstacles: Matter.Body[] = [];
    socket: Socket | null = null;
    mouse: Matter.Mouse;
    mouseConstraint: Matter.MouseConstraint;

    constructor(element: HTMLElement, map: string, socket: Socket | null = null){
        this.element = element;
        this.engine = Matter.Engine.create();
        this.world = this.engine.world;
        [this.width, this.height] = this.calculateWidthHeight();
        this.rendrer = Matter.Render.create({
            element: this.element,
            engine: this.engine,
            options: {
                width: this.width,
                height: this.height,
                wireframes: false,
                background: '#260323'
            }
        });
        this.mouse = Matter.Mouse.create(this.rendrer.canvas);
        this.mouseConstraint = Matter.MouseConstraint.create(this.engine, {mouse: this.mouse, constraint: {stiffness: 1, render: {visible: false}}});
        this.createObstacles(map);
        this.createWorld();
        this.generateEvents();
        Matter.Render.run(this.rendrer);
        Matter.Engine.run(this.engine);
    }

    private generateEvents(): void{
        Matter.Events.on(this.engine, 'beforeUpdate', () => {
            let x: number = this.mouse.position.x;
            let min: number = this.map(150 / 2, 0, 650, 0, this.width) - 5
            let max: number = this.width - min + 10;
            if (x >= min && x <= max){
                Body.setPosition(this.player1, {x: this.mouse.position.x, y: this.player1.position.y});
                // this.socket?.emit('move', {x: this.map(this.mouse.position.x, 0, this.width, 0, 650)});
            }
        });
    }

    private map(value: number, min1: number, max1: number, min2: number, max2: number) {
        return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
    }

    private createWorld(): void{
        this.player1 = Matter.Bodies.rectangle(this.map(325, 0, 650, 0, this.width), this.map(735, 0, 750, 0, this.height), this.map(150, 0, 650, 0, this.width), this.map(13, 0, 750, 0, this.height), {isStatic: true, render: {fillStyle: '#ffffff'}, chamfer: { radius: 6.5 }})
        this.player2 = Matter.Bodies.rectangle(this.map(325, 0, 650, 0, this.width), this.map(15, 0, 750, 0, this.height), this.map(150, 0, 650, 0, this.width), this.map(13, 0, 750, 0, this.height), {isStatic: true, render: {fillStyle: '#ffffff'}, chamfer: { radius: 6.5 }})
        this.center = Matter.Bodies.rectangle(this.map(325, 0, 650, 0, this.width), this.map(375, 0, 750, 0, this.height), this.map(620, 0, 650, 0, this.width), this.map(5, 0, 750, 0, this.height), {isStatic: true, render: {fillStyle: '#ffffff'}, chamfer: { radius: 3 }})
        this.ball = Matter.Bodies.circle(this.width / 2, this.height / 2, this.map(15, 0, 650, 0, this.width), {isStatic: false, render: {fillStyle: '#ffffff'}})
        Matter.World.add(this.world, [this.player1, this.player2, this.ball, this.center]);
    }


    private createObstacles(map: string): void{
        if (map === 'map1')
            return ;
        if (map === 'map2'){
            this.obstacles.push(Matter.Bodies.rectangle(this.width, this.map(187, 0, 750, 0, this.height), this.map(190, 0, 650, 0, this.width), this.map(30, 0, 750, 0, this.height), {isStatic: true, render:{fillStyle: '#FFFF00'}}));
            this.obstacles.push(Matter.Bodies.rectangle(0, this.map(315, 0, 750, 0, this.height), this.map(190, 0, 650, 0, this.width), this.map(30, 0, 750, 0, this.height), {isStatic: true, render:{fillStyle: '#FFFF00'}}));
            this.obstacles.push(Matter.Bodies.rectangle(0, this.map(564, 0, 750, 0, this.height), this.map(190, 0, 650, 0, this.width), this.map(30, 0, 750, 0, this.height), {isStatic: true, render:{fillStyle: '#FFFF00'}}));
            this.obstacles.push(Matter.Bodies.rectangle(this.width, this.map(440, 0, 750, 0, this.height), this.map(190, 0, 650, 0, this.width), this.map(30, 0, 750, 0, this.height), {isStatic: true, render:{fillStyle: '#FFFF00'}}));
            Matter.World.add(this.world, this.obstacles);
        }
        if (map === 'map3'){
            this.obstacles.push(Matter.Bodies.rectangle(this.width, this.map(187, 0, 750, 0, this.height), this.map(190, 0, 650, 0, this.width), this.map(30, 0, 750, 0, this.height), {isStatic: true, render:{fillStyle: '#FFFF00'}}));
            this.obstacles.push(Matter.Bodies.rectangle(0, this.map(315, 0, 750, 0, this.height), this.map(390, 0, 650, 0, this.width), this.map(30, 0, 750, 0, this.height), {isStatic: true, render:{fillStyle: '#FFFF00'}}));
            this.obstacles.push(Matter.Bodies.rectangle(0, this.map(564, 0, 750, 0, this.height), this.map(190, 0, 650, 0, this.width), this.map(30, 0, 750, 0, this.height), {isStatic: true, render:{fillStyle: '#FFFF00'}}));
            this.obstacles.push(Matter.Bodies.rectangle(this.width, this.map(440, 0, 750, 0, this.height), this.map(440, 0, 650, 0, this.width), this.map(30, 0, 750, 0, this.height), {isStatic: true, render:{fillStyle: '#FFFF00'}}));
            Matter.World.add(this.world, this.obstacles);

        }
    }

    public calculateWidthHeight(): [number, number]{
        let width: number, height: number;
        if (this.element.clientWidth < this.element.clientHeight){
            width = this.element.clientWidth;
            height = width * 1 / this.ar;
            if (height > this.element.clientHeight){
                height = this.element.clientHeight;
                width = height * this.ar;
            }
        }else{
            height = this.element.clientHeight;
            width = height * this.ar;
            if (width > this.element.clientWidth){
                width = this.element.clientWidth;
                height = width * 1 / this.ar;
            }
        }
        return [width, height];
    }

    public destroy(): void{
        this.rendrer.canvas.remove();
    }

    public updateState(data: {p1: Vector, p2: Vector, ball: Vector}){
        if (this.player1 && this.player2 && this.ball){
            Matter.Body.setPosition(this.player1, {x: this.map(data.p1.x, 0, 650, 0, this.width), y: this.map(data.p1.y, 0, 750, 0, this.height)});
            Matter.Body.setPosition(this.player2, {x: this.map(data.p2.x, 0, 650, 0, this.width), y: this.map(data.p2.y, 0, 750, 0, this.height)});
            Matter.Body.setPosition(this.ball, {x: this.map(data.ball.x, 0, 650, 0, this.width), y: this.map(data.ball.y, 0, 750, 0, this.height)});
        }
    }
}

export default GameModel;