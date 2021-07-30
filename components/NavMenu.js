import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Container, Dropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from './Image';
import NavDropdown from './NavDropdown';
import FlatSpinner from './FlatSpinner';
import FriendRequestsMenu from './FriendRequestsMenu';
import styles from './NavMenu.module.css';

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

        {isLoggingOut ? (
          <FlatSpinner className="ml-auto" />
        ) : (
          <>
            <Image
              publicId={currentUser.profilePicture}
              size="40"
              profilePicName={currentUser.name}
              variant="circle"
              href={`/profile/${currentUser.username}`}
              className="ml-auto"
            />
            <Link href={`/profile/${currentUser.username}`} passHref>
              <Navbar.Text
                className={`d-none d-md-block mx-3 text-dark ${styles.name}`}
              >
                {currentUser.name}
              </Navbar.Text>
            </Link>
            <NavDropdown
              className="ml-4"
              icon="bi-person-lines-fill"
              id="friend-requests-dropdown"
            >
              <FriendRequestsMenu />
            </NavDropdown>
            <NavDropdown
              className="ml-4"
              icon="bi-bell-fill"
              id="notifications-dropdown"
            >
              <p>Content</p>
            </NavDropdown>
            <NavDropdown
              className="ml-4"
              icon="bi-three-dots"
              id="hamburger-dropdown"
            >
              <Link href="/settings" passHref>
                <Dropdown.Item>Settings</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
            </NavDropdown>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default NavMenu;
