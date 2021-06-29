import Head from 'next/head';
import { Container } from 'react-bootstrap';
import NavMenu from './NavMenu';
import styles from './Layout.module.css';

const Layout = ({ pageTitle, children }) => (
  <>
    <Head>
      <title>socialize | {pageTitle}</title>
    </Head>
    <header>
      <NavMenu />
    </header>
    <main className={styles.mainContainer}>
      <Container>{children}</Container>
    </main>
  </>
);

export default Layout;
