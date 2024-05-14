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
import { useEffect } from 'react';
import {
  useGetChannelsQuery, useRemoveChannelMutation, useUpdateChannelMutation, channelsApi,
} from '../../slices/channelsSlice';
import { changeChannel, setShowModal, setChannelModal } from '../../slices/appSlice';
import { useGetMessagesQuery, useRemoveMessageMutation } from '../../slices/messagesSlice';
import NewChannel from './NewChannel';
import socket from '../../socket';

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
  const modalChannelId = useSelector((state) => state.app.modalChannelId);
  const modalChannelName = useSelector((state) => state.app.modalChannelName);
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
  const handleShowModal = (modalName, channel) => {
    dispatch(setShowModal(modalName));
    dispatch(setChannelModal({ id: channel.id, name: channel.name }));
  };

  const handleCloseModal = () => {
    dispatch(setShowModal(''));
    dispatch(setChannelModal({ id: '', name: '' }));
  };
  const deleteChannel = async (id) => {
    console.log(id);
    const filtredMessages = messages.filter((message) => message.channelId === id);
    if (filtredMessages.length > 0) {
      const promises = filtredMessages.map(async (message) => {
        await removeMessage(message.id);
      });
      await Promise.all(promises);
      refetchMessages();
    }
    await removeChannel(id);
    refetchChannels();
    handleCloseModal();
    dispatch(changeChannel({ id: '1', name: 'general' }));
    toast.success(t('toast.deleteChannel'));
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
  useEffect(() => {
    const handleNewChannel = (channel) => {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        draft.push(channel);
      }));
    };
    socket.on('newChannel', handleNewChannel);
    return () => {
      socket.off('newChannel');
    };
  });
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
                <Button onClick={() => switchChannel(channel)} className="w-100 rounded-0 text-start text-truncate" variant={getVariantButton(channel)}>{`# ${channel.name}`}</Button>

                <Dropdown.Toggle as={Button} className="text-end" split variant={getVariantButton(channel)} id={`dropdown-split-button${channel.id}`}>
                  <span className="visually-hidden">{t('dropdown.toggle')}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleShowModal('delete-channel', channel)}>{t('channels.dropdown.delete')}</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleShowModal('rename-channel', channel)}>{t('channels.dropdown.rename')}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                as={ButtonGroup}
                variant={getVariantButton(channel)}
                className="w-100 text-start rounded-0 text-truncate"
                onClick={() => switchChannel(channel)}
              >
                {`# ${channel.name}`}
              </Button>
            )}
          </Nav.Item>
        ))}
      </Nav>
      <Modal show={showModal === 'rename-channel'} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.titleRenameChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ channelName: modalChannelName, channelId: modalChannelId }}
            validationSchema={ChannelNameSchema}
            onSubmit={renameChannel}
          >
            {({
              values, handleChange, handleSubmit, errors,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="channelName" visuallyHidden>{t('form.labels.channelName')}</Form.Label>
                <Form.Control onChange={handleChange} value={values.channelName} id="channelName" isInvalid={!!errors.channelName} autoFocus />
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
            <Button type="button" variant="danger" onClick={() => deleteChannel(modalChannelId)}>{t('form.buttons.delete')}</Button>
          </div>
        </Modal.Body>
      </Modal>
    </Col>
  );
};

export default Channels;
