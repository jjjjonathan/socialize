import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Navbar, Container, Dropdown } from 'react-bootstrap';
import { signOut } from 'next-auth/react';
import Image from '../ui/Image';
import NavDropdown from './NavDropdown';
import FlatSpinner from '../spinners/FlatSpinner';
import FriendRequestsMenu from './FriendRequestsMenu';
import { SessionUser } from '../../types/misc';

const NavbarText = styled(Navbar.Text)`
  font-weight: 600;
  font-size: 0.97em;
`;

type Props = {
  currentUser: SessionUser;
  profilePicture: string;
};

const NavMenu = ({ currentUser, profilePicture }: Props) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      signOut();
    } catch (error) {
      console.error(error);
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
          <FlatSpinner className="ml-auto mr-0" />
        ) : (
          <>
            <Image
              publicId={profilePicture}
              size="40"
              profilePicName={currentUser.name}
              variant="circle"
              href={`/profile/${currentUser.username}`}
              className="ml-auto"
            />
            <Link href={`/profile/${currentUser.username}`} passHref>
              <NavbarText
                as="a"
                className="d-none d-md-block mx-3 text-dark mb-1"
              >
                {currentUser.name}
              </NavbarText>
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
