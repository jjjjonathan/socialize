import { useState } from 'react';
import { Toast as BootstrapToast } from 'react-bootstrap';

const Toast = ({ body }) => {
  const [show, setShow] = useState(true);

  return (
    <BootstrapToast show={show} onClose={() => setShow(!show)}>
      <BootstrapToast.Header>
        <small>11 min ago</small>
      </BootstrapToast.Header>
      <BootstrapToast.Body>{body}</BootstrapToast.Body>
    </BootstrapToast>
  );
};

export default Toast;
