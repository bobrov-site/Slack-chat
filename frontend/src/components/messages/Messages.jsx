import Col from 'react-bootstrap/esm/Col';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetMessagesQuery, messagesApi } from '../../api/messages';
import socket from '../../socket';
import MessagesForm from './MessagesForm';

const Messages = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: messages = [] } = useGetMessagesQuery();
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const currentChannelName = useSelector((state) => state.app.currentChannelName);
  const filtredMessages = messages.filter((message) => message.channelId === currentChannelId);
  const messagesContainer = useRef();
  useEffect(() => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
    }
  }, [messages]);
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
  }, [dispatch, messagesContainer]);
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
        <div className="overflow-auto px-5" ref={messagesContainer}>
          {filtredMessages.map((message) => (
            <div className="text-break mb-2" key={message.id}>
              <b>{message.username}</b>
              :
              {message.message}
            </div>
          ))}
        </div>
        <MessagesForm />
      </div>
    </Col>
  );
};

export default Messages;
