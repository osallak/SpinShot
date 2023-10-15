 import "@/styles/globals.css";
 import { Provider } from "react-redux";
import { store } from "../../redux_tool/store";
import type { AppProps } from "next/app";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Provider  store={store} >
      <Component {...pageProps} />
      </Provider>
    </RecoilRoot>
  )
}

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <Provider store={store}>
//       <Component {...pageProps} />
//     </Provider>
//   );
// }
