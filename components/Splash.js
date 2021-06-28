import Head from 'next/head';
import { Container } from 'react-bootstrap';
import styles from './Splash.module.css';

const Splash = ({ pageTitle, children }) => (
  <>
    <Head>
      <title>socialize | {pageTitle}</title>
    </Head>
    <main>
      <Container className={styles.container}>
        <div className={styles.center}>{children}</div>
      </Container>
    </main>
  </>
);

export default Splash;
