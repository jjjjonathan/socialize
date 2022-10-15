import { SWRConfig } from 'swr';
import { SessionProvider } from 'next-auth/react';
import fetcher from '../utils/fetcher';
import '../styles/global.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const swrOptions = {
    fetcher,
  };

  return (
    <SessionProvider session={session}>
      <SWRConfig value={swrOptions}>
        <Component {...pageProps} />
      </SWRConfig>
    </SessionProvider>
  );
}
