import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import {
  useGetChannelsQuery, channelsApi,
} from '../../api/channels';
import { changeChannel, setChannelModal } from '../../store/slices/appSlice';
import socket from '../../socket';
import RenameChannel from '../modals/RenameChannel';
import DeleteChannel from '../modals/DeleteChannel';
import NewChannel from '../modals/NewChannel';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: channels = [] } = useGetChannelsQuery();
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const getVariantButton = (channel) => (channel.id === currentChannelId ? 'secondary' : 'light');
  const switchChannel = (channel) => {
    const { id, name } = channel;
    if (id !== currentChannelId) {
      dispatch(changeChannel({ id, name }));
    }
  };
  const handleShowModal = (modalName, channel = { id: '', name: '' }) => {
    dispatch(setChannelModal({ id: channel.id, name: channel.name, modalName }));
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
        <Button size="sm" variant="outline-primary" onClick={() => handleShowModal('new-channel')}>
          +
        </Button>
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
      <RenameChannel />
      <DeleteChannel />
      <NewChannel />
    </Col>
  );
};

export default Channels;
