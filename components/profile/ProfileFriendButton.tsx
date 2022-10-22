import { useState, useEffect, DetailedHTMLProps, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FriendStatus } from '../../types/misc';
import FlatSpinner from '../spinners/FlatSpinner';
import FriendRequestButtons from './FriendRequestButtons';

const StyledButton = styled(Button)`
  padding: 6px 16px;
  font-weight: 500;
  font-size: 1em;
  height: 24px;
  box-sizing: content-box;
`;

const RequestedDiv = styled.div`
  font-weight: 600;
  font-size: 0.95em;
`;

const FriendsDiv = styled.div`
  font-weight: 700;
  font-size: 1.05em;
`;

type FriendButtonStatus = 'default' | 'submitting' | FriendStatus;

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  friendStatus: FriendStatus | null;
  name: string;
  username: string;
  id: string;
}

const ProfileFriendButton = ({
  friendStatus,
  name,
  username,
  id,
  ...props
}: Props) => {
  const [status, setStatus] = useState<FriendButtonStatus>('default');

  useEffect(() => {
    if (friendStatus) setStatus(friendStatus);
  }, [friendStatus]);

  const onAddFriend = async () => {
    try {
      setStatus('submitting');
      await axios.post(`/api/user/${username}/add-friend`);
      setStatus('requested');
    } catch (error) {
      setStatus('default');
      console.error(error);
      toast.error('Could not add friend!');
    }
  };

  const onRequestApprove = () => {
    setStatus('friends');
  };

  const onRequestDelete = () => {
    setStatus('default');
  };

  const innards = () => {
    switch (status) {
      case 'submitting':
        return (
          <StyledButton disabled variant="secondary">
            <FlatSpinner
              size="20"
              color="white"
              style={{ marginTop: '-1px' }}
            />
          </StyledButton>
        );
      case 'requested':
        return (
          <RequestedDiv className="text-secondary h6">
            <i className="bi bi-check-lg text-secondary mr-1" /> Friend
            Requested
          </RequestedDiv>
        );
      case 'request':
        return (
          <div className="d-flex flex-column align-items-end">
            <small className="mb-2">{name} added you as a friend!</small>
            <FriendRequestButtons
              id={id}
              onApprove={onRequestApprove}
              onDelete={onRequestDelete}
            />
          </div>
        );
      case 'friends':
        return (
          <FriendsDiv className="text-secondary h6">
            <i className="bi bi-check-lg text-secondary mr-1" /> Friends
          </FriendsDiv>
        );
      default:
        return (
          <StyledButton onClick={onAddFriend} variant="secondary">
            <i className="bi bi-person-plus" /> Add Friend
          </StyledButton>
        );
    }
  };

  return <div {...props}>{innards()}</div>;
};

export default ProfileFriendButton;
