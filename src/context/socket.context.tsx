import ip from "@/utils/endPoint";
import { createContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useAppSelector } from "../../redux_tool";

const SocketContext = createContext<any>(null);
let socket = io(`${ip}/games`, {
  // extraHeaders: {},
  autoConnect: false,
});

export const setSocket = (s: Socket) => {
  socket = s;
}

const SocketProvider = ({ children }: any) => {

  useEffect(() => {
    try {
      if (!socket) {
        console.log("setting the socket context");
        const s = io(`${ip}/games`, {
          // extraHeaders: {},
          autoConnect: false,
        });
        setSocket(s);
      }
      return () => {
        if (socket) socket.disconnect();
      };
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <SocketContext.Provider value={{
      socket,
      setSocket
    }}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
