import { Card, Form, Button } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const NewPost = () => {
  const handleNewPost = console.log;

  const validationSchema = yup.object().shape({
    body: yup.string().label('Your post').min(3).max(2000),
  });

  return (
    <Card className="glass-card-form mb-4">
      <Card.Body>
        <Formik
          initialValues={{ body: '' }}
          validationSchema={validationSchema}
          onSubmit={handleNewPost}
        >
          {({ isSubmitting, errors }) => (
            <FormikForm noValidate>
              <Form.Group className="mb-0" controlId="body">
                <Field
                  type="text"
                  name="body"
                  as={() => (
                    <Form.Control
                      as="textarea"
                      rows={5}
                      className="glass-card-textarea p-3"
                      placeholder="What's on your mind?"
                    />
                  )}
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
                disabled={isSubmitting}
                style={{ position: 'absolute', right: '10px', bottom: '10px' }}
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
