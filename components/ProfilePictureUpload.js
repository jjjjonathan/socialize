import { useState } from 'react';
import axios from 'axios';
import { Button, Collapse } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Image from './Image';
import FlatSpinner from './FlatSpinner';

const ProfilePictureUpload = ({ currentUser }) => {
  const router = useRouter();

  const [changeOpen, setChangeOpen] = useState();
  const [file, setFile] = useState();
  const [isSubmitting, setIsSubmitting] = useState();

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // eslint-disable-next-line no-undef
    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      setIsSubmitting(true);
      await axios.post('/api/user/profile-picture', formData);
      router.reload();
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
      // TODO add error handling
    }
  };

  return (
    <>
      <div className="d-flex align-items-center">
        <Image
          publicId={currentUser.profilePicture}
          profilePicName={currentUser.name}
          size="60"
        />
        <Button
          onClick={() => setChangeOpen(!changeOpen)}
          aria-expanded={changeOpen}
          aria-controls="collapse-change-profile-picture"
          variant={changeOpen ? 'outline-secondary' : 'secondary'}
          style={{ height: 'fit-content' }}
          className="ml-3"
        >
          Change
        </Button>
      </div>
      <Collapse in={changeOpen}>
        <div id="collapse-change-profile-picture">
          <form onSubmit={handleSubmit} className="medium">
            <input
              type="file"
              name="profilePicture"
              accept="image/png, image/jpeg"
              onChange={onFileChange}
              required
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <FlatSpinner size="20" /> : 'Submit'}
            </Button>
          </form>
        </div>
      </Collapse>
    </>
  );
};

export default ProfilePictureUpload;
