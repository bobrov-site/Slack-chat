import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useGetChannelsQuery, useRemoveChannelMutation, useUpdateChannelMutation } from '../../slices/channelsSlice';
import { changeChannel, setShowModal } from '../../slices/appSlice';
import { useGetMessagesQuery, useRemoveMessageMutation } from '../../slices/messagesSlice';
import NewChannel from './NewChannel';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: channels = [], refetch: refetchChannels } = useGetChannelsQuery();
  const showModal = useSelector((state) => state.app.showModal);
  const [removeChannel] = useRemoveChannelMutation();
  const [updateChannel] = useUpdateChannelMutation();
  const { data: messages = [], refetch: refetchMessages } = useGetMessagesQuery();
  const [removeMessage] = useRemoveMessageMutation();
  const channelsNames = channels.map((channel) => channel.name);
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const ChannelNameSchema = Yup.object().shape({
    channelName: Yup.string().notOneOf(channelsNames, t('form.errors.channelExists')).min(3, t('form.errors.range')).max(20, t('form.errors.range'))
      .required(t('form.errors.required')),
  });
  const getVariantButton = (channel) => (channel.id === currentChannelId ? 'secondary' : 'light');
  const switchChannel = (channel) => {
    const { id, name } = channel;
    if (id !== currentChannelId) {
      dispatch(changeChannel({ id, name }));
      refetchMessages();
    }
  };
  const handleShowModal = (modalName) => {
    dispatch(setShowModal(modalName));
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
    toast.success(t('toast.addChannel'));
    refetchChannels();
    handleCloseModal();
    dispatch(changeChannel({ id: '1', name: 'general' }));
  };
  const renameChannel = async (values) => {
    const { channelName, channelId } = values;
    const data = {};
    data.name = channelName;
    data.removable = true;
    data.id = channelId;
    await updateChannel(data);
    refetchChannels();
    handleCloseModal();
    dispatch(changeChannel({ id: channelId, name: channelName }));
    toast.success(t('toast.renameChannel'));
  };
  return (
    <Col xs="4" md="2" className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.title')}</b>
        <NewChannel />
      </div>
      <Nav className="flex-column nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <Nav.Item key={channel.id}>
            {channel.removable ? (
              <Dropdown as={ButtonGroup} drop="down" className="w-100">
                <Button onClick={() => switchChannel(channel)} className="text-start" variant={getVariantButton(channel)}>{`# ${channel.name}`}</Button>

                <Dropdown.Toggle className="text-end" split variant={getVariantButton(channel)} id={`dropdown-split-button${channel.id}`} />

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleShowModal('delete-channel')}>{t('channels.dropdown.delete')}</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleShowModal('rename-channel')}>{t('channels.dropdown.rename')}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                as={ButtonGroup}
                variant={getVariantButton(channel)}
                className="w-100 text-start rounded-0"
                onClick={() => switchChannel(channel)}
              >
                {`# ${channel.name}`}
              </Button>
            )}
            <Modal show={showModal === 'rename-channel'} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>{t('modals.titleRenameChannel')}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Formik
                  initialValues={{ channelName: channel.name, channelId: channel.id }}
                  validationSchema={ChannelNameSchema}
                  onSubmit={renameChannel}
                >
                  {({
                    values, handleChange, handleSubmit, errors,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Form.Label htmlFor="channelName">{t('form.labels.channelName')}</Form.Label>
                      <Form.Control onChange={handleChange} value={values.channelName} name="channelName" id="channelName" isInvalid={!!errors.channelName} autoFocus />
                      <Form.Control.Feedback type="invalid">{errors.channelName}</Form.Control.Feedback>
                      <div className="d-flex justify-content-end mt-2">
                        <Button type="button" variant="secondary" onClick={handleCloseModal} className="me-2">{t('form.buttons.cancel')}</Button>
                        <Button type="submit" variant="primary">{t('form.buttons.submit')}</Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Modal.Body>
            </Modal>
            <Modal show={showModal === 'delete-channel'} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>{t('modals.titleDeleteChannel')}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>{t('modals.textDeleteChannel')}</p>
                <div className="d-flex justify-content-end mt-2">
                  <Button type="button" variant="secondary" onClick={handleCloseModal} className="me-2">{t('form.buttons.cancel')}</Button>
                  <Button type="button" variant="danger" onClick={() => deleteChannel(channel.id)}>{t('form.buttons.delete')}</Button>
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
