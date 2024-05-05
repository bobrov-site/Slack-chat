import { Plus } from 'react-bootstrap-icons';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useGetChannelsQuery, useAddChannelMutation } from '../../slices/channelsSlice';
import { changeChannel, setShowModal } from '../../slices/appSlice';
import { useGetMessagesQuery } from '../../slices/messagesSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const { data: channels = [], refetch: refetchChannels } = useGetChannelsQuery();
  const { refetch: refetchMessages } = useGetMessagesQuery();
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const showModal = useSelector((state) => state.app.showModal);
  const getVariantButton = (channel) => (channel.id === currentChannelId ? 'secondary' : 'light');
  const channelsNames = channels.map((channel) => channel.name);
  const [addChannel] = useAddChannelMutation();

  const ChannelNameSchema = Yup.object().shape({
    channelName: Yup.string().notOneOf(channelsNames, 'Такой канал уже существует').min(3, 'Too Short!').max(20, 'Too Long!')
      .required('Required'),
  });
  const switchChannel = (channel) => {
    const { id, name } = channel;
    if (id !== currentChannelId) {
      dispatch(changeChannel({ id, name }));
      refetchMessages();
    }
  };
  const handleShowModal = () => {
    dispatch(setShowModal(true));
  };

  const handleCloseModal = () => {
    dispatch(setShowModal(false));
  };

  const handleFormSubmit = async (values) => {
    const { channelName } = values;
    const data = {};
    data.name = channelName;
    data.removable = true;
    try {
      const response = await addChannel(data);
      const { id, name } = response.data;
      dispatch(changeChannel({ id, name }));
      refetchChannels();
      handleCloseModal();
      toast.success('Канал добавлен');
    } catch (e) {
      return null;
    }
  };
  return (
    <Col xs="4" md="2" className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button size="sm" variant="outline-primary" onClick={() => handleShowModal()}>
          <Plus />
        </Button>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить канал</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{ channelName: '' }}
              onSubmit={handleFormSubmit}
              validationSchema={ChannelNameSchema}
            >
              {({
                values, handleChange, handleSubmit, errors,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Label htmlFor="channelName">Имя канала</Form.Label>
                  <Form.Control value={values.channelName} name="channelName" onChange={handleChange} id="channelName" isInvalid={!!errors.channelName} autoFocus />
                  <Form.Control.Feedback type="invalid">{errors.channelName}</Form.Control.Feedback>
                  <div className="d-flex justify-content-end mt-2">
                    <Button type="button" variant="secondary" onClick={handleCloseModal} className="me-2">Отменить</Button>
                    <Button type="submit" variant="primary">Отправить</Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      </div>
      <Nav className="flex-column nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <Nav.Item key={channel.id}>
            <Button onClick={() => switchChannel(channel)} type="button" className="w-100 text-start rounded-0" variant={getVariantButton(channel)}>{`#${channel.name}`}</Button>
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  );
};

export default Channels;
