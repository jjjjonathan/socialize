import Head from 'next/head';
import styles from './Splash.module.scss';

const Splash = ({ pageTitle, children }) => (
  <>
    <Head>
      <title>socialize | {pageTitle}</title>
    </Head>
    <main>
      <div className={styles.container}>
        <div className={styles.center}>{children}</div>
      </div>
    </main>
  </>
);

export default Splash;
