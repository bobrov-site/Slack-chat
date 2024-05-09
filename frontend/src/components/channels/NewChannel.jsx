import { Plus } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import * as filter from 'leo-profanity';
import { useGetChannelsQuery, useAddChannelMutation } from '../../slices/channelsSlice';
import { changeChannel, setShowModal } from '../../slices/appSlice';

const NewChannel = () => {
  const { t } = useTranslation();
  const { data: channels = [], refetch: refetchChannels } = useGetChannelsQuery();
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.app.showModal);
  const channelsNames = channels.map((channel) => channel.name);
  const [addChannel] = useAddChannelMutation();
  const ChannelNameSchema = Yup.object().shape({
    channelName: Yup.string().notOneOf(channelsNames, t('form.errors.channelExists')).min(3, t('form.errors.range')).max(20, t('form.errors.range'))
      .required(t('form.errors.required')),
  });
  filter.loadDictionary('ru');
  const handleShowModal = () => {
    dispatch(setShowModal('new-channel'));
  };

  const handleCloseModal = () => {
    dispatch(setShowModal(''));
  };
  const handleFormSubmit = async (values) => {
    const { channelName } = values;
    const data = {};
    data.name = filter.clean(channelName);
    data.removable = true;
    const response = await addChannel(data);
    const { id, name } = response.data;
    dispatch(changeChannel({ id, name }));
    refetchChannels();
    handleCloseModal();
    toast.success(t('toast.addChannel'));
  };
  return (
    <div>

      <Button size="sm" variant="outline-primary" onClick={() => handleShowModal()}>
        <Plus />
      </Button>
      <Modal show={showModal === 'new-channel'} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.titleAddChannel')}</Modal.Title>
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
                <Form.Label htmlFor="channelName">{t('form.labels.channelName')}</Form.Label>
                <Form.Control value={values.channelName} name="channelName" onChange={handleChange} id="channelName" isInvalid={!!errors.channelName} autoFocus />
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
    </div>
  );
};

export default NewChannel;
