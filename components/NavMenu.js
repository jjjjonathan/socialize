import Link from 'next/link';
import { Navbar, Nav, Container } from 'react-bootstrap';
import useCurrentUser from '../hooks/useCurrentUser';

const NavMenu = () => {
  const { currentUser } = useCurrentUser();

  const userMenu = () => {
    if (currentUser) {
      return (
        <>
          <Navbar.Text className="mr-3">
            Welcome, {currentUser.name}
          </Navbar.Text>
          <Nav.Item>
            <Nav.Link>Log out</Nav.Link>
          </Nav.Item>
        </>
      );
    }
    return (
      <Nav.Item>
        <Link href="/login" passHref>
          <Nav.Link>Log in</Nav.Link>
        </Link>
      </Nav.Item>
    );
  };

  return (
    <Navbar bg="primary" expand="md" fixed="top">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>socialize</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item>
              <Link href="/" passHref>
                <Nav.Link>Home</Nav.Link>
              </Link>
            </Nav.Item>
          </Nav>
          <Nav>{userMenu()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavMenu;
