import { Card, Form, Button } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const NewPost = () => {
  const handleNewPost = console.log;

  const validationSchema = yup.object().shape({
    body: yup.string().label('Your post').min(3).max(2000),
  });

  return (
    <Card className="glass-card mb-4">
      <Card.Body>
        <Formik
          initialValues={{ body: '' }}
          validationSchema={validationSchema}
          onSubmit={handleNewPost}
        >
          {({ isSubmitting, errors }) => (
            <FormikForm noValidate>
              <Form.Group className="mb-2" controlId="body">
                <Field
                  type="text"
                  name="body"
                  placeholder="What's on your mind?"
                  as={Form.Control}
                  isInvalid={!!errors.body}
                />
                <ErrorMessage
                  name="body"
                  component={Form.Control.Feedback}
                  type="invalid"
                />
              </Form.Group>
              <Button
                type="submit"
                variant="outline-dark"
                className="auth-button"
                disabled={isSubmitting}
              >
                Post
              </Button>
            </FormikForm>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default NewPost;