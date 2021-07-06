import { SWRConfig } from 'swr';
import fetcher from '../utils/fetcher';
import '../styles/global.scss';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';

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
