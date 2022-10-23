import React, { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import toast from 'react-hot-toast';
import CircleSpinner from '../spinners/CircleSpinner';

const StyledButton = styled(Button)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border-width: 0;
`;

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  username: string;
  onRemove: (username: string) => void;
}

const AddFriendButton = ({ username, onRemove, ...props }: Props) => {
  const [status, setStatus] = useState('default');

  const onClick = async () => {
    try {
      setStatus('submitting');
      await axios.post(`/api/user/${username}/add-friend`);
      setStatus('success');
      setTimeout(() => {
        onRemove(username);
      }, 2000);
    } catch (error) {
      setStatus('default');
      console.error(error);
      toast.error('Could not add friend');
    }
  };

  const innards = () => {
    switch (status) {
      case 'submitting':
        return <CircleSpinner size="25" color="secondary" />;
      case 'success':
        return <i className="bi bi-check-lg text-secondary" />;
      default:
        return (
          <StyledButton onClick={onClick} variant="outline-secondary">
            <i className="bi bi-person-plus-fill" />
          </StyledButton>
        );
    }
  };

  return (
    <div
      {...props}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
      }}
    >
      {innards()}
    </div>
  );
};

export default AddFriendButton;
