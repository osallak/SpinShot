import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { RecoilRoot } from "recoil";
import { store } from "../../redux_tool/store";
import { SocketContext, SocketProvider, getChatSocket} from "@/context/socket.context";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { useAppSelector } from "../../redux_tool";
import { io } from "socket.io-client";
import ip from "@/utils/endPoint";
import { get } from "http";

type FuncProps = {
  children: React.ReactNode;
};

const Func = ({ children }: FuncProps) => {
  const auth_status = useAppSelector((state) => state.Profile.auth_status);
  let { socket, setSocket, setChatSocket, chatSocket, setGlobalSocketAuth, getGlobalSocket, connectGlobalSocket, setChatSocketAuth, connectChatSocket } = useContext(SocketContext);
  useEffect(() => {
    const s = io(`${ip}/games`, {
      // extraHeaders: {},
      autoConnect: false,
    });
    const sc = io(`${ip}/chat`, {
      // extraHeaders: {},
      autoConnect: false,
    });
    if (auth_status === true) {
      if (!sc.connected) {
        sc.auth = {
          token: localStorage.getItem("token"),
        };
        setChatSocket(sc);
        setChatSocketAuth(localStorage.getItem("token") as string);
        connectChatSocket();
        console.log("chat socket", getChatSocket());
      }
      if (!s.connected) {
        s.auth = {
          token: localStorage.getItem("token"),
        };
        s.on("connect_error", (err: any) => {
          console.log(`connect_error due to ${err.message}`);
        });
        setSocket(s);
        setGlobalSocketAuth(localStorage.getItem("token") as string);
        connectGlobalSocket();
        console.log("game socket", getGlobalSocket());
      }
    }
  }, [auth_status]);

  return <div>{children}</div>;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Toaster />
      <Provider store={store}>
        <SocketProvider>
          <Func>
            <Component {...pageProps} />
          </Func>
        </SocketProvider>
      </Provider>
    </RecoilRoot>
  );
}
