import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useGetChannelsQuery, useRemoveChannelMutation } from '../../slices/channelsSlice';
import { changeChannel, setShowModal } from '../../slices/appSlice';
import { useGetMessagesQuery, useRemoveMessageMutation } from '../../slices/messagesSlice';
import NewChannel from './NewChannel';

const Channels = () => {
  const dispatch = useDispatch();
  const { data: channels = [], refetch } = useGetChannelsQuery();
  const showModal = useSelector((state) => state.app.showModal);
  const [removeChannel] = useRemoveChannelMutation();
  const { data: messages = [], refetch: refetchMessages } = useGetMessagesQuery();
  const [removeMessage] = useRemoveMessageMutation();
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const getVariantButton = (channel) => (channel.id === currentChannelId ? 'secondary' : 'light');
  const switchChannel = (channel) => {
    const { id, name } = channel;
    if (id !== currentChannelId) {
      dispatch(changeChannel({ id, name }));
      refetchMessages();
    }
  };
  const handleShowModal = () => {
    dispatch(setShowModal('delete-channel'));
  };

  const handleCloseModal = () => {
    dispatch(setShowModal(''));
  };
  const deleteChannel = async (id) => {
    const filtredMessages = messages.filter((message) => message.channelId === id);
    if (filtredMessages.length > 0) {
      const promises = filtredMessages.map(async (message) => {
        await removeMessage(message.id);
      });
      await Promise.all(promises);
      refetchMessages();
    }
    await removeChannel(id);
    toast.success('Канал добавлен');
    refetch();
    handleCloseModal();
    dispatch(changeChannel({ id: '1', name: 'general' }));
  };
  return (
    <Col xs="4" md="2" className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <NewChannel />
      </div>
      <Nav className="flex-column nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <Nav.Item key={channel.id}>
            {channel.removable ? (
              <Dropdown as={ButtonGroup} drop="down" className="w-100">
                <Button onClick={() => switchChannel(channel)} className="text-start" variant={getVariantButton(channel)}>{channel.name}</Button>

                <Dropdown.Toggle className="text-end" split variant={getVariantButton(channel)} id={`dropdown-split-button${channel.id}`} />

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleShowModal()}>Удалить</Dropdown.Item>
                  <Dropdown.Item>Переименовать</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                as={ButtonGroup}
                variant={getVariantButton(channel)}
                className="w-100 text-start rounded-0"
                onClick={() => switchChannel(channel)}
              >
                {channel.name}
              </Button>
            )}
            <Modal show={showModal === 'delete-channel'} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Удалить канал</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Вы действительно хотите удалить канал?</p>
                <div className="d-flex justify-content-end mt-2">
                  <Button type="button" variant="secondary" onClick={handleCloseModal} className="me-2">Отменить</Button>
                  <Button type="button" variant="danger" onClick={() => deleteChannel(channel.id)}>Удалить</Button>
                </div>
              </Modal.Body>
            </Modal>
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  );
};

export default Channels;
