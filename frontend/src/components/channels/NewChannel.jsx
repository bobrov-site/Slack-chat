import { Plus } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useGetChannelsQuery, useAddChannelMutation } from '../../slices/channelsSlice';
import { changeChannel, setShowModal } from '../../slices/appSlice';

const NewChannel = () => {
  const { data: channels = [], refetch: refetchChannels } = useGetChannelsQuery();
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.app.showModal);
  const channelsNames = channels.map((channel) => channel.name);
  const [addChannel] = useAddChannelMutation();
  const ChannelNameSchema = Yup.object().shape({
    channelName: Yup.string().notOneOf(channelsNames, 'Такой канал уже существует').min(3, 'Too Short!').max(20, 'Too Long!')
      .required('Required'),
  });
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
    const response = await addChannel(data);
    const { id, name } = response.data;
    dispatch(changeChannel({ id, name }));
    refetchChannels();
    handleCloseModal();
    toast.success('Канал добавлен');
  };
  return (
    <div>

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
  );
};

export default NewChannel;
