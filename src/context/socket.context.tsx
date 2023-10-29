import ip from "@/utils/endPoint";
import { createContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useAppSelector } from "../../redux_tool";
import toast from "react-hot-toast";

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
      socket.on("invite", (data: any) => {
        toast.custom(<div className="bg-very-dark-purple fixed z-[1000] w-auto h-auto flex justify-center flex-col rounded-xl p-4 space-y-2">
        <p className="text-pearl font-Poppins font-bold xl:text-2xl lg:text-xl md:text-base sm:text-base text-xs">
          You have been invited to a game by user 
        </p>
        <div className="flex justify-between">
          <button className="text-cyan-800 bg-pearl rounded-xl p-2 hover:bg-green-300 hover:w-7 hover:h-7">Accept</button>
          <button className="text-red-800 bg-pearl rounded-xl p-2 hover:bg-red-300">Decline</button>
        </div>
        </div>, {
          duration: Infinity,
        })
      })
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
