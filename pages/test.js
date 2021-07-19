import FriendRequest from '../components/FriendRequest';

const friendReq = {
  user: {
    name: 'Hallie Anderson',
    username: 'halliea',
    profilePicture: 'https://avatar.tobi.sh/halliea.svg?size=512&text=HA',
    id: '60e4c52ee54b7c7ed47cc24b',
  },
  timestamp: '2021-07-10T22:54:13.904Z',
  id: '60ea2515bbe1b73602fec25d',
};

const Test = () => (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{ height: '100vh' }}
  >
    <div style={{ background: 'lightgray', width: 250, height: 120 }}>
      <FriendRequest friendReq={friendReq} />
    </div>
    <div>Hello</div>
    <div className="medium">Hello</div>
    <div className="small">Hello</div>
  </div>
);

export default Test;
