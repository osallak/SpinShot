import ip from "@/utils/endPoint";
import { createContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useAppSelector } from "../../redux_tool";

const SocketContext = createContext<any>(null);
let socket = io(`${ip}/games`, {
  // extraHeaders: {},
  autoConnect: false,
});

let chatSocket = io(`${ip}/chat`, {
  // extraHeaders: {},
  autoConnect: false,
});

export const setSocket = (s: Socket) => {
  socket = s;
};

export const setGlobalSocketAuth = (token: string) => {
  socket.auth = {
    token: token,
  };
}

export const setChatSocket = (s: Socket) => {
  chatSocket = s;
};

export const getGlobalSocket = () => {
  return socket;
}

export const connectGlobalSocket = () => {
  socket.connect();
}

export const connectChatSocket = () => {
  chatSocket.connect();
}

export const setChatSocketAuth = (token: string) => {
  chatSocket.auth = {
    token: token,
  };
}

export const getChatSocket = () => {
  return chatSocket;
}

const SocketProvider = ({ children }: any) => {
  useEffect(() => {
    try {
      return () => {
        if (chatSocket) chatSocket.disconnect();
        if (socket) socket.disconnect();
      };
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket,
        chatSocket,
        setChatSocket,
        setGlobalSocketAuth,
        getGlobalSocket,
        connectGlobalSocket,
        setChatSocketAuth,
        getChatSocket,
        connectChatSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
