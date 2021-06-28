import Head from 'next/head';
import Link from 'next/link';
import { Navbar, Nav, Container } from 'react-bootstrap';
import styles from './Layout.module.css';

const Layout = ({ pageTitle, children }) => (
  <>
    <Head>
      <title>socialize | {pageTitle}</title>
    </Head>
    <header>
      <Navbar bg="primary" expand="md" fixed="top">
        <Container>
          <Link href="/" passHref>
            <Navbar.Brand>socialize</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="mr-auto">
              <Link href="/" passHref>
                <Nav.Link>Home</Nav.Link>
              </Link>
            </Nav>
            <Nav>
              <Link href="/login" passHref>
                <Nav.Link>Login</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
    <main className={styles.mainContainer}>
      <Container>{children}</Container>
    </main>
  </>
);

export default Layout;
