import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import * as filter from 'leo-profanity';
import { useAddChannelMutation } from '../../api/channels';
import { changeChannel } from '../../store/slices/appSlice';

const NewChannel = (children) => {
  const {
    handleCloseModal, showModal, dispatch, t, channelNameSchema,
  } = children;
  const [addChannel] = useAddChannelMutation();
  const handleFormSubmit = async (values) => {
    try {
      const { channelName } = values;
      const data = {
        name: filter.clean(channelName),
        removable: true,
      };
      const response = await addChannel(data);
      const { id, name } = response.data;
      dispatch(changeChannel({ id, name }));
      handleCloseModal();
      toast.success(t('toast.addChannel'));
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Modal show={showModal === 'adding'} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.titleAddChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: '' }}
          onSubmit={handleFormSubmit}
          validationSchema={channelNameSchema}
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
  );
};

export default NewChannel;
