import { Alert as BootstrapAlert } from 'react-bootstrap';

const Alert = ({ type, children }) => {
  const heading = () => {
    if (type === 'error')
      return <BootstrapAlert.Heading as="h5">Uh oh!</BootstrapAlert.Heading>;
    return null;
  };
  return (
    <BootstrapAlert className="soft-alert">
      {heading()}
      {children}
    </BootstrapAlert>
  );
};

export default Alert;
