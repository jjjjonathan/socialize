import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const ProfilePictureUpload = ({ currentUser }) => {
  const [file, setFile] = useState();

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // eslint-disable-next-line no-undef
    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      await axios.post('/api/user/profile-picture', formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Image
        src={currentUser.profilePicture}
        alt={`Profile picture of ${currentUser.name}`}
        width="50"
        height="50"
      />
      <form onSubmit={handleSubmit} className="medium">
        <input
          type="file"
          name="profilePicture"
          accept="image/png, image/jpeg"
          onChange={onFileChange}
        />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

export default ProfilePictureUpload;
