import { SWRConfig } from 'swr';
import fetcher from '../utils/fetcher';
import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  const swrOptions = {
    fetcher,
  };

  return (
    <SWRConfig value={swrOptions}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
