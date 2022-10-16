import { AppProps } from 'next/app';
import { Session } from 'next-auth';
import { SWRConfig } from 'swr';
import { SessionProvider } from 'next-auth/react';
import fetcher from '../utils/fetcher';
import '../styles/global.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session | null }>) => {
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
};

export default App;
