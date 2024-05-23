import { useSelector } from 'react-redux';
import * as filter from 'leo-profanity';
import Button from 'react-bootstrap/esm/Button';
import { Send } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useAddMessageMutation } from '../../api/messages';

const MessagesForm = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const username = useSelector((state) => state.app.username);
  const [addMessage] = useAddMessageMutation();
  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { message } = values;
      const data = {
        message: filter.clean(message),
        channelId: currentChannelId,
        username,
      };
      await addMessage(data);
      resetForm();
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="mt-auto py-3 px-5">
      <Formik initialValues={{ message: '' }} onSubmit={handleFormSubmit}>
        {({ handleSubmit, handleChange, values }) => (
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Label htmlFor="new-message" hidden>{t('form.labels.message')}</Form.Label>
              <Form.Control placeholder={t('form.placeholders.message')} autoFocus id="new-message" aria-label={t('form.labels.newMessage')} value={values.message} onChange={handleChange} type="text" name="message" />
              <Button type="submit">
                <Send />
              </Button>
            </InputGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessagesForm;
