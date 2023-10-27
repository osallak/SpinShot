import ip from "@/utils/endPoint";
import { createContext, useEffect, useState } from "react";
import io, { Socket, } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

const SocketProvider = ({ children }: any) => {
  const [socket, setSocket] = useState<Socket | null>(null);
 
  useEffect(() => {
    localStorage.setItem("debug", "*");
    const newSocket = io(`${ip}/games`, {
      extraHeaders: {  },
      autoConnect: false,
    });
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
