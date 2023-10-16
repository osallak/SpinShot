import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { RecoilRoot } from "recoil";
import { store } from "../../redux_tool/store";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
			<Toaster />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </RecoilRoot>
  );
}
