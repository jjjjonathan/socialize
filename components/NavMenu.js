import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import axios from 'axios';
import FlatSpinner from './FlatSpinner';

const NavMenu = ({ currentUser }) => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await axios.post('/api/auth/logout');
      router.push('/login');
    } catch (error) {
      console.log(error);
      setIsLoggingOut(false);
    }
  };

  return (
    <Navbar bg="primary" expand="sm" fixed="top">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>socialize</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ml-auto">
            {isLoggingOut ? (
              <FlatSpinner />
            ) : (
              <>
                <NavDropdown
                  title="Friend Requests"
                  id="friend-requests-dropdown"
                >
                  {currentUser.friendRequests.length !== 0 ? (
                    currentUser.friendRequests.map((friendReq) => (
                      <Navbar.Text key={friendReq.id}>
                        {friendReq.name}
                      </Navbar.Text>
                    ))
                  ) : (
                    <Navbar.Text>None</Navbar.Text>
                  )}
                </NavDropdown>
                <NavDropdown
                  title={`Welcome, ${currentUser.name}`}
                  id="nav-dropdown"
                >
                  <Link href={`/profile/${currentUser.username}`} passHref>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavMenu;
