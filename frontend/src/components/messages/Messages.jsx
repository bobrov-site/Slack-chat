import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
import { Send } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as filter from 'leo-profanity';
import { useGetMessagesQuery, useAddMessageMutation, messagesApi } from '../../api/messages';
import socket from '../../socket';

const Messages = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: messages = [], refetch } = useGetMessagesQuery();
  const username = useSelector((state) => state.app.username);
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const currentChannelName = useSelector((state) => state.app.currentChannelName);
  const filtredMessages = messages.filter((message) => message.channelId === currentChannelId);
  const [addMessage] = useAddMessageMutation();
  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    const data = {};
    const { message } = values;
    data.message = filter.clean(message);
    data.channelId = currentChannelId;
    data.username = username;
    await addMessage(data);
    resetForm();
    setSubmitting(false);
  };
  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
        draft.push(newMessage);
      }));
    };
    socket.on('newMessage', handleNewMessage);
    return () => {
      socket.off('newMessage');
    };
  }, [dispatch, refetch]);
  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="mb-0">
            <b>
              {`# ${currentChannelName}`}
            </b>
          </p>
          <span className="text-muted">
            {filtredMessages.length}
            {' '}
            {t('messages.messages')}
          </span>
        </div>
        <div className="overflow-auto px-5">
          {filtredMessages.map((message) => (
            <div className="text-break mb-2" key={message.id}>
              <b>{message.username}</b>
              :
              {message.message}
            </div>
          ))}
        </div>
        <div className="mt-auto py-3 px-5">
          <Formik initialValues={{ message: '' }} onSubmit={handleFormSubmit}>
            {({ handleSubmit, handleChange, values }) => (
              <Form onSubmit={handleSubmit}>
                <InputGroup>
                  <Form.Label htmlFor="new-message" hidden>{t('form.labels.message')}</Form.Label>
                  <Form.Control placeholder={t('form.placeholders.message')} autoFocus id="new-message" aria-label={t('form.labels.newMessage')} value={values.message} onChange={handleChange} type="text" name="message" />
                  <Button type="submit">
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
