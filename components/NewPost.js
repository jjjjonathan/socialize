import { Card, Form, Button } from 'react-bootstrap';
import { Formik, Form as FormikForm, ErrorMessage } from 'formik';
import TextareaAutosize from 'react-textarea-autosize';
import * as yup from 'yup';

const NewPost = () => {
  const handleNewPost = console.log;

  const validationSchema = yup.object().shape({
    body: yup.string().label('Your post').min(3).max(2000),
  });

  return (
    <Formik
      initialValues={{ body: '' }}
      validationSchema={validationSchema}
      onSubmit={handleNewPost}
    >
      {({ isSubmitting, errors }) => (
        <>
          <Card className="glass-card-form mb-4">
            <Card.Body>
              <FormikForm noValidate>
                <Form.Control
                  as={TextareaAutosize}
                  minRows={3}
                  className={`glass-card-textarea ${
                    errors.body ? 'is-invalid' : null
                  }`}
                  placeholder="What's on your mind?"
                  name="body"
                  id="body"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    bottom: '10px',
                  }}
                >
                  Post
                </Button>
              </FormikForm>
            </Card.Body>
          </Card>
          <ErrorMessage
            name="body"
            component={Form.Control.Feedback}
            type="invalid"
          />
        </>
      )}
    </Formik>
  );
};

export default NewPost;
