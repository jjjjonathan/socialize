import Head from 'next/head';
import Link from 'next/link';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Layout = ({ pageTitle, children }) => (
  <>
    <Head>
      <title>socialize | {pageTitle}</title>
      <meta name="description" content="A new social network" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <header>
      <Navbar bg="info" variant="dark" expand="md" fixed="top">
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
    <main className="mt-3">
      <Container>{children}</Container>
    </main>
  </>
);

export default Layout;
