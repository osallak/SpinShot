import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { RecoilRoot } from "recoil";
import { store } from "../../redux_tool/store";
import { SocketProvider } from "@/context/socket.context";


export default function App({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
      <RecoilRoot>
        <SocketProvider>
          <Component {...pageProps} />
        </SocketProvider>
      </RecoilRoot>
      </Provider>
  );
}
