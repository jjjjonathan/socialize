import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import axios from 'axios';
import useCurrentUser from '../hooks/useCurrentUser';
import FlatSpinner from './FlatSpinner';

const NavMenu = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { currentUser, setCurrentUser } = useCurrentUser();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await axios.post('/api/auth/logout');
      setCurrentUser(null);
      setIsLoggingOut(false);
    } catch (error) {
      console.log(error);
      setIsLoggingOut(false);
    }
  };

  const userMenu = () => {
    if (currentUser) {
      return isLoggingOut ? (
        <FlatSpinner />
      ) : (
        <>
          <NavDropdown title={`Welcome, ${currentUser.name}`} id="nav-dropdown">
            <NavDropdown.Item href="#">Action</NavDropdown.Item>
            <NavDropdown.Item href="#">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLogout}
            >
              Log out
            </NavDropdown.Item>
          </NavDropdown>
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
    <Navbar bg="primary" expand="sm" fixed="top">
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
