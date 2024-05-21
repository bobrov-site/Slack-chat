import { useSelector } from 'react-redux';
import NewChannel from './NewChannel';
import RenameChannel from './RenameChannel';
import DeleteChannel from './DeleteChannel';

const modals = {
  adding: NewChannel,
  renaming: RenameChannel,
  removing: DeleteChannel,
};

const ModalContainer = () => {
  const showModal = useSelector((state) => state.app.showModal);
  if (!showModal) {
    return null;
  }
  const ModalComponent = modals[showModal];
  return <ModalComponent />;
};

export default ModalContainer;
