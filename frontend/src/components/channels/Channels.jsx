import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useGetChannelsQuery, channelsApi,
} from '../../api/channels';
import { setChannelModal, setUserData } from '../../store/slices/appSlice';
import socket from '../../socket';
import RenameChannel from '../modals/RenameChannel';
import DeleteChannel from '../modals/DeleteChannel';
import NewChannel from '../modals/NewChannel';
import Item from './Item';
import { appPaths } from '../../routes';
import useAuth from '../../hooks';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const { data: channels = [], error: channelError } = useGetChannelsQuery();
  const handleShowModal = (modalName, channel = { id: '', name: '' }) => {
    dispatch(setChannelModal({ id: channel.id, name: channel.name, modalName }));
  };

  useEffect(() => {
    if (channelError) {
      logOut();
      dispatch(setUserData({ nickname: '', token: null }));
      navigate(appPaths.login());
    }
    const handleNewChannel = (channel) => {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        draft.push(channel);
      }));
    };
    socket.on('newChannel', handleNewChannel);
    return () => {
      socket.off('newChannel');
    };
  }, [dispatch, channelError, navigate, logOut]);
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
          <Item key={channel.id} data={channel} />
        ))}
      </Nav>
      <RenameChannel />
      <DeleteChannel />
      <NewChannel />
    </Col>
  );
};

export default Channels;
