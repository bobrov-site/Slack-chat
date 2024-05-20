import NewChannel from './NewChannel';
import RenameChannel from './RenameChannel';
import DeleteChannel from './DeleteChannel';

const modals = {
  adding: NewChannel,
  renaming: RenameChannel,
  removing: DeleteChannel,
};

const getModal = (modalName) => modals[modalName];

export default getModal;
