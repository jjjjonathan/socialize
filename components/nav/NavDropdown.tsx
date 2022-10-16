import React from 'react';
import { Dropdown, DropdownProps } from 'react-bootstrap';
import CustomToggle from './CustomToggle';

interface Props extends DropdownProps {
  icon: string;
  id: string;
}

const NavDropdown = ({ children, icon, id, ...props }: Props) => (
  <Dropdown {...props}>
    <Dropdown.Toggle as={CustomToggle} id={id}>
      <i className={`bi ${icon}`}></i>
    </Dropdown.Toggle>
    <Dropdown.Menu align="right">{children}</Dropdown.Menu>
  </Dropdown>
);

export default NavDropdown;
