import { Alert as BootstrapAlert } from 'react-bootstrap';

const Alert = ({ type, children }) => {
  const heading = () => {
    if (type === 'error') return 'Uh oh!';
    return null;
  };
  return (
    <BootstrapAlert className="soft-alert">
      <BootstrapAlert.Heading as="h5">{heading()}</BootstrapAlert.Heading>
      {children}
    </BootstrapAlert>
  );
};

export default Alert;
