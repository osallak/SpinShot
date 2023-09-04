import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import  {store}  from '../../redux_tool/store'
import Sidebar from '@/Components/ui/Sidebar/sidebar'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
        <Component {...pageProps} />
        {/* <Sidebar></Sidebar> */}
    </Provider>
  )
}
