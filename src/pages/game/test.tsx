import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

const PingPongGame = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Create a Matter.js engine
    const engine = Matter.Engine.create();

    // Create a Matter.js renderer
    const render = Matter.Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: 650,
        height: 750,
      },
    });

    // Create a ball
    const ball = Matter.Bodies.circle(325, 375, 10);

    // Create paddles
    const paddleOptions = { isStatic: true };
    const paddle = Matter.Bodies.rectangle(325, 15, 150, 20, paddleOptions);
    const paddle1 = Matter.Bodies.rectangle(325, 735, 150, 20, paddleOptions);

    // Add bodies to the world
    Matter.World.add(engine.world, [ball, paddle, paddle1]);

    // Start the Matter.js renderer
    Matter.Render.run(render);

    return () => {
      // Cleanup when the component unmounts
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default PingPongGame;
