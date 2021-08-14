import { Card, Form, Button } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import TextareaAutosize from 'react-textarea-autosize';
import * as yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import FlatSpinner from './FlatSpinner';

const NewPost = ({ addNewPostToFeed }) => {
  const handleNewPost = async ({ newPost }, { resetForm }) => {
    try {
      const { data } = await axios.post('/api/post', { body: newPost });
      addNewPostToFeed(data);
      resetForm();
      toast.success('Posted!');
    } catch (error) {
      console.error(error);
      toast.error('Could not add new post!');
    }
  };

  const validationSchema = yup.object().shape({
    newPost: yup
      .string()
      .label('Your post')
      .min(3)
      .max(2000)
      .required('Your post cannot be empty'),
  });

  return (
    <Formik
      initialValues={{ newPost: '' }}
      validationSchema={validationSchema}
      onSubmit={handleNewPost}
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
                    errors.newPost && touched.newPost ? 'is-invalid' : null
                  }`}
                  placeholder="What's on your mind?"
                  name="newPost"
                  id="newPost"
                  value={values.newPost}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="new-post-submit-button"
                  style={{ width: 38, height: 24, boxSizing: 'content-box' }}
                >
                  {isSubmitting ? (
                    <FlatSpinner
                      size="18"
                      style={{ marginTop: '-3px', marginLeft: '-8px' }}
                    />
                  ) : (
                    'Post'
                  )}
                </Button>
              </FormikForm>
            </Card.Body>
          </Card>
          {errors.newPost && touched.newPost ? (
            <div className="invalid-feedback new-post-validation-error">
              {errors.newPost}
            </div>
          ) : null}
        </>
      )}
    </Formik>
  );
};

export default NewPost;
