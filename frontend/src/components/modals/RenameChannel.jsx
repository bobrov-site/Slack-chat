import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { useGetChannelsQuery, useUpdateChannelMutation, channelsApi } from '../../api/channels';
import { setChannelModal, changeChannel } from '../../store/slices/appSlice';
import socket from '../../socket';

const RenameChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [updateChannel] = useUpdateChannelMutation();
  const showModal = useSelector((state) => state.app.showModal);
  const modalChannelId = useSelector((state) => state.app.modalChannelId);
  const modalChannelName = useSelector((state) => state.app.modalChannelName);
  const { data: channels = [] } = useGetChannelsQuery();
  const channelsNames = channels.map((channel) => channel.name);
  const channelNameSchema = Yup.object().shape({
    channelName: Yup.string().notOneOf(channelsNames, t('form.errors.channelExists')).min(3, t('form.errors.range')).max(20, t('form.errors.range'))
      .required(t('form.errors.required')),
  });

  const handleCloseModal = () => {
    dispatch(setChannelModal({ id: '', name: '', modalName: '' }));
  };
  const renameChannel = async (values) => {
    try {
      const { channelName, channelId } = values;
      const data = {
        name: channelName,
        removable: true,
        id: channelId,
      };
      await updateChannel(data).unwrap();
      handleCloseModal();
      dispatch(changeChannel({ id: channelId, name: channelName }));
      toast.success(t('toast.renameChannel'));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const handleRenameChannel = ({ id, name }) => {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        const channel = draft;
        const index = channel.findIndex((curChannels) => curChannels.id === id);
        channel[index].name = name;
      }));
    };
    socket.on('renameChannel', handleRenameChannel);
    return () => {
      socket.off('renameChannel');
    };
  }, [dispatch]);
  return (
    <Modal show={showModal === 'rename-channel'} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.titleRenameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: modalChannelName, channelId: modalChannelId }}
          validationSchema={channelNameSchema}
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
  );
};

export default RenameChannel;
