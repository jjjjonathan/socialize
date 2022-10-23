import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import axios from 'axios';
import { Button, Collapse } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Image from '../ui/Image';
import FlatSpinner from '../spinners/FlatSpinner';
import { SessionUser } from '../../types/misc';

type Props = {
  currentUser: SessionUser;
};

const ProfilePictureUpload = ({ currentUser }: Props) => {
  const router = useRouter();

  const [changeOpen, setChangeOpen] = useState(false);
  const [file, setFile] = useState<Blob>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newFile = event?.target?.files && event.target.files[0];
    if (newFile) setFile(newFile);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!file) return;

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
        <div>
          <div
            id="collapse-change-profile-picture"
            className="bg-light p-4 mt-3"
            style={{ borderRadius: 10 }}
          >
            <form
              onSubmit={handleSubmit}
              className="medium d-flex align-items-center"
            >
              <input
                type="file"
                name="profilePicture"
                accept="image/png, image/jpeg"
                onChange={onFileChange}
                required
              />
              <Button type="submit" disabled={isSubmitting} className="ml-auto">
                {isSubmitting ? <FlatSpinner size="20" /> : 'Submit'}
              </Button>
            </form>
          </div>
        </div>
      </Collapse>
    </>
  );
};

export default ProfilePictureUpload;
