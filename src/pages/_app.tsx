import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { RecoilRoot } from "recoil";
import { store } from "../../redux_tool/store";
import { SocketContext, SocketProvider } from "@/context/socket.context";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { useAppSelector } from "../../redux_tool";

type FuncProps = {
  children: React.ReactNode;
};

const Func = ({ children }: FuncProps) => {
  const auth_status = useAppSelector((state) => state.Profile.auth_status);
  const socket = useContext(SocketContext);
  useEffect(() => {
    if (!socket) return;
    if (auth_status === true) {
      console.log("auth_status:", auth_status);
      console.log("token:", localStorage.getItem("token"));
      console.log("socket:", socket);
      socket.auth = {
        token: localStorage.getItem("token"),
      }
      console.log("socket.auth:", socket.auth);
      socket.on("connect_error", (err:any) => {
        console.log(`connect_error due to ${err.message}`);
      });
      socket.connect();

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
