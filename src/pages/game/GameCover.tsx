
import React, { useEffect, useRef } from 'react';
import { Engine, Render, World, Bodies, Body, Events } from 'matter-js';

export default function PingPongGame() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const engine = Engine.create();
    const render = Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: 650,
        height: 750,
        wireframes: false,
        background: "#260323",
      },
    });

    const wallOptions = { isStatic: true };
    World.add(engine.world, [
      Bodies.rectangle(400, 0, 800, 20, wallOptions),
      Bodies.rectangle(400, 750, 800, 20, wallOptions),
      Bodies.rectangle(0, 300, 10, 890, wallOptions),
      Bodies.rectangle(650, 10, 20, 2090, wallOptions),
    ]);

    const paddle = Bodies.rectangle(325, 15, 150, 20, { isStatic: true, chamfer: { radius: 10 }  });
    const paddle1 = Bodies.rectangle(325, 735, 150, 20, { isStatic: true, chamfer: { radius: 10 }  });
    const ball = Bodies.circle(325, 375, 15,{
      restitution : 1,
      friction:0,
      frictionAir:0,


      
    });

    
    World.add(engine.world, [paddle, paddle1, ball]);
    
    Engine.run(engine);
    Render.run(render);
    
    const forceMagnitude = {
      x:0.005,
      y:-0.005,
    };
    Body.applyForce(ball, { x: 0, y: 0 }, forceMagnitude);
    
    
    Events.on(engine, 'collisionStart', (event:any) => {
      const pairs = event.pairs;
      pairs.forEach((pair:any) => {
        
        if ((pair.bodyA === ball && pair.bodyB === paddle) || (pair.bodyA === ball && pair.bodyB === paddle1)) {
          
          const velocity = ball.velocity;
          velocity.x *= -1; 
        }
      });
    });
    
    
    const canvas = canvasRef.current ;

        canvas.addEventListener('mousemove', handleMouseMove);
    
    function handleMouseMove(event:any) {
      let mouseX;
      let newX;
      if (canvasRef.current)
      {
        mouseX = event.clientX - canvasRef.current.getBoundingClientRect().left;
        newX = Math.min(canvasRef.current.width - 150 / 2, Math.max(150 / 2, mouseX));
      }
      Body.setPosition(paddle1, { x: newX, y: 730 });
    }
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      Render.stop(render);
      Engine.clear(engine);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full rounded-3xl"></canvas>;
}
