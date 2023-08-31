import { RecoilRoot } from 'recoil';
import Page from './[id]'

function MyApp({ Component, pageProps }:any) {
    return (
      <RecoilRoot>
        <Page {...pageProps} />
      </RecoilRoot>
    );
  }
  
  export default MyApp;