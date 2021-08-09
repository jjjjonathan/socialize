import React from 'react';
import { Dropdown, Button } from 'react-bootstrap';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <Button
    className="circle-button"
    variant="outline-dark"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </Button>
));

const NavDropdown = ({ children, icon, id, ...props }) => (
  <Dropdown {...props}>
    <Dropdown.Toggle as={CustomToggle} id={id}>
      <i className={`bi ${icon}`}></i>
    </Dropdown.Toggle>
    <Dropdown.Menu align="right">{children}</Dropdown.Menu>
  </Dropdown>
);

export default NavDropdown;
