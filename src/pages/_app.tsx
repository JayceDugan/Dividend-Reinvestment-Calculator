import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import '@/styles/globals.css';

import store from '../data-access/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}

export default MyApp;
