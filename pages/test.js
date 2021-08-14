import FriendRequest from '../components/FriendRequest';

const friendReq = {
  user: {
    name: 'Hallie Anderson',
    username: 'halliea',
    profilePicture: 'yqayu565erhm66q6c5hz',
    id: '60e4c52ee54b7c7ed47cc24b',
  },
  timestamp: '2021-07-10T22:54:13.904Z',
  id: '60ea2515bbe1b73602fec25d',
};

const Test = () => (
  <>
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <div
        style={{
          background: 'lightgray',
          width: 400,
          height: 200,
        }}
      >
        <FriendRequest friendReq={friendReq} />
      </div>
    </div>
  </>
);

export default Test;
