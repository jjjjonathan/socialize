import { Card, Form, Button } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import TextareaAutosize from 'react-textarea-autosize';
import * as yup from 'yup';
import axios from 'axios';
import FlatSpinner from './FlatSpinner';

const NewPost = ({ addNewPostToFeed }) => {
  const handleNewPost = async ({ newPost }) => {
    try {
      const postedPost = await axios.post('/api/post', { body: newPost });
      console.log(postedPost);
      addNewPostToFeed(postedPost);
    } catch (error) {
      console.error(error);
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
                >
                  {isSubmitting ? <FlatSpinner size="20" /> : 'Post'}
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
