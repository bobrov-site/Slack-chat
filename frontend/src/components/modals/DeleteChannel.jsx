import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useGetChannelsQuery, useRemoveChannelMutation } from '../../api/channels';
import { useRemoveMessageMutation } from '../../api/messages';
import { changeChannel, setChannelModal } from '../../store/slices/appSlice';

const DeleteChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.app.showModal);
  const modalChannelId = useSelector((state) => state.app.modalChannelId);
  const { refetch: refetchChannels } = useGetChannelsQuery();
  const { data: messages = [], refetch: refetchMessages } = useGetChannelsQuery();
  const [removeChannel] = useRemoveChannelMutation();
  const [removeMessage] = useRemoveMessageMutation();
  const handleCloseModal = () => {
    dispatch(setChannelModal({ id: '', name: '', modalName: '' }));
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
    refetchChannels();
    handleCloseModal();
    dispatch(changeChannel({ id: '1', name: 'general' }));
    toast.success(t('toast.deleteChannel'));
  };
  return (
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
  );
};

export default DeleteChannel;
