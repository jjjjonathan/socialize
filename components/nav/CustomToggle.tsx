import React from 'react';
import { Button } from 'react-bootstrap';

type Props = {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLElement>;
};

const CustomToggle = React.forwardRef<any, Props>(
  ({ children, onClick }, ref) => (
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
  ),
);

export default CustomToggle;
