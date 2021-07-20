import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import FriendRequest from '../components/FriendRequest';
import FriendRequestsDropdown from '../components/FriendRequestsDropdown';
import NavMenu from '../components/NavMenu';
import NavDropdown from '../components/NavDropdown';

const friendReq = {
  user: {
    name: 'Hallie Anderson',
    username: 'halliea',
    profilePicture: 'https://avatar.tobi.sh/halliea.svg?size=512&text=HA',
    id: '60e4c52ee54b7c7ed47cc24b',
  },
  timestamp: '2021-07-10T22:54:13.904Z',
  id: '60ea2515bbe1b73602fec25d',
};

const currentUser = { name: 'Jonny Baby', username: 'jonnybaby12345' };

const TestNavMenu = () => (
  <Navbar bg="primary" expand="sm" fixed="top">
    <Container>
      <Link href="/" passHref>
        <Navbar.Brand>socialize</Navbar.Brand>
      </Link>

      <NavDropdown
        className="ml-auto"
        icon="bi-person-lines-fill"
        id="friend-requests-dropdown"
      >
        <p>Content</p>
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
        <Link href={`/settings`} passHref>
          <Dropdown.Item>Settings</Dropdown.Item>
        </Link>
      </NavDropdown>

      {/* <Nav className="ml-auto">
        <FriendRequestsDropdown />
        <NavDropdown title={`Welcome, ${currentUser.name}`} id="nav-dropdown">
          <Link href={`/profile/${currentUser.username}`} passHref>
            <NavDropdown.Item>Profile</NavDropdown.Item>
          </Link>
          <NavDropdown.Divider />
          <NavDropdown.Item>Log out</NavDropdown.Item>
        </NavDropdown>
      </Nav> */}
    </Container>
  </Navbar>
);

const Test = () => (
  <>
    <TestNavMenu currentUser={currentUser} />
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <div style={{ background: 'lightgray', width: 250, height: 120 }}>
        <FriendRequest friendReq={friendReq} />
      </div>
      <div>Hello</div>
      <div className="medium">Hello</div>
      <div className="small">Hello</div>
    </div>
  </>
);

export default Test;
