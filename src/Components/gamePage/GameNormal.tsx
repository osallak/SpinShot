import React, { useEffect, useRef } from "react";
import { Engine, Render, World, Bodies, Body, Events } from "matter-js";
import io from "socket.io-client";

const GameNormal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballRef = useRef<any>(null);
  let socket: any;
  
  useEffect(() => {
    let pos_x = 0;
    const engine = Engine.create();
    const render = Render.create({
      canvas: canvasRef.current!,
      engine: engine,
      options: {
        width: 650,
        height: 750,
        wireframes: false,
        background: "#260323",
      },
    });

    socket = io("http://localhost:3000");

    socket.on("eventFromBackend", (data: any) => {
      // game.updateState(data);
    });

    const paddle = Bodies.rectangle(325, 15, 150, 13, {
      isStatic: true,
      chamfer: { radius: 6.5 },
      render: {
        fillStyle: "white",
        opacity: 0.9,
      },
    });

    const center = Bodies.rectangle(325, 375, 620, 5, {
      isStatic: true,
      chamfer: { radius: 3 },
      render: {
        fillStyle: "white",
        opacity: 0.9,
      },
    });

    const paddle1 = Bodies.rectangle(325, 735, 150, 13, {
      isStatic: true,
      chamfer: { radius: 6.5 },
      render: {
        fillStyle: "white",
        opacity: 0.9,
      },
    });

    const ball = Bodies.circle(325, 375, 15, {
      isStatic: true,
      render: {
        fillStyle: "white",
        opacity: 0.9,
      },
    });

    ballRef.current = ball;

    World.add(engine.world, [paddle, paddle1, center, center, ball]);

    const canvas = canvasRef.current;
    
    function handleMouseMove(event: any) {
      let mouseX;
      let newX = 0;
      if (canvasRef.current) {
        mouseX = event.clientX - canvasRef.current.getBoundingClientRect().left;
        newX = Math.min(
          canvasRef.current.width - 150 / 2,
          Math.max(150 / 2, mouseX)
          );
        }
        Body.setPosition(paddle1, { x: newX, y: 730 });
      }
      
      if (canvas) {
        canvas.style.cursor = "";
        canvas.addEventListener("mousemove", handleMouseMove);
      }
      
      const updateEngine = () => {
        Engine.update(engine, 1000 / 60);
        
        if (ballRef.current) {
          Body.setPosition(ballRef.current, {
            x: 32,
            y: pos_x,
          });
          pos_x = pos_x + 1;
        }
        
        requestAnimationFrame(updateEngine);
      };

      Engine.run(engine);
      Render.run(render);
      updateEngine();

    return () => {
      if (canvas) canvas.removeEventListener("mousemove", handleMouseMove);
      socket.disconnect();
      Render.stop(render);
      Engine.clear(engine);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="w-full h-full rounded-3xl"></canvas>
  );
};

export default GameNormal;
