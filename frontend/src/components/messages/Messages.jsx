import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
import { Send } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Formik } from 'formik';
import { useGetMessagesQuery } from '../../slices/messagesSlice';

const Messages = () => {
  const { data: messages = [] } = useGetMessagesQuery();
  console.log(messages);
  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="mb-0">
            <b># general</b>
          </p>
          <span className="text-muted">2 сообщения</span>
        </div>
        <div className="overflow-auto px-5">
          <div className="text-break mb-2">
            <b>admin</b>
            :
            hello world
          </div>
        </div>
        <div className="mt-auto py-3 px-5">
          <Formik>
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <InputGroup>
                  <Form.Control />
                  <Button>
                    <Send />
                  </Button>
                </InputGroup>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Col>
  );
};

export default Messages;
