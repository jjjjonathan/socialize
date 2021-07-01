import { Alert as BootstrapAlert } from 'react-bootstrap';

const Alert = ({ type, children }) => {
  const heading = () => {
    if (type === 'error') return 'Uh oh!';
    return null;
  };
  return (
    <BootstrapAlert className="soft-alert">
      <BootstrapAlert.Heading as="h5">{heading()}</BootstrapAlert.Heading>
      <p className="mb-0">{children}</p>
    </BootstrapAlert>
  );
};

export default Alert;
