import React from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';

type Props = {
  type?: 'error';
  children: React.ReactNode;
};

const Alert = ({ type, children }: Props) => (
  <BootstrapAlert className="soft-alert">
    {type === 'error' && (
      <BootstrapAlert.Heading as="h5">Uh oh!</BootstrapAlert.Heading>
    )}
    {children}
  </BootstrapAlert>
);

export default Alert;
