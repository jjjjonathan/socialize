import { Card, Form, Button } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import TextareaAutosize from 'react-textarea-autosize';
import * as yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import FlatSpinner from './spinners/FlatSpinner';

const AboutMeUpdate = ({ originalBio }) => {
  const handleUpdateBio = async ({ bio }) => {
    try {
      await axios.post('/api/user/bio', { bio });
      toast.success('Successfully updated About Me!');
    } catch (error) {
      console.error(error);
      toast.error('Could not update About Me!');
    }
  };

  const validationSchema = yup.object().shape({
    bio: yup.string().label('About me').min(3).max(1000),
  });

  return (
    <Formik
      initialValues={{ bio: originalBio || '' }}
      validationSchema={validationSchema}
      onSubmit={handleUpdateBio}
    >
      {({ isSubmitting, errors, touched, values, handleChange }) => (
        <>
          <Card className="glass-card-form mb-4">
            <Card.Body>
              <FormikForm noValidate>
                <Form.Control
                  as={TextareaAutosize}
                  minRows={3}
                  maxRows={12}
                  className={`glass-card-textarea ${
                    errors.bio && touched.bio ? 'is-invalid' : null
                  }`}
                  placeholder="About Me"
                  name="bio"
                  id="bio"
                  value={values.bio}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="new-post-submit-button"
                  style={{ width: 62, height: 24, boxSizing: 'content-box' }}
                >
                  {isSubmitting ? (
                    <FlatSpinner
                      size="18"
                      style={{ marginTop: '-3px', marginLeft: '5px' }}
                    />
                  ) : (
                    'Update'
                  )}
                </Button>
              </FormikForm>
            </Card.Body>
          </Card>
          {errors.bio && touched.bio ? (
            <div className="invalid-feedback new-post-validation-error">
              {errors.bio}
            </div>
          ) : null}
        </>
      )}
    </Formik>
  );
};

export default AboutMeUpdate;
