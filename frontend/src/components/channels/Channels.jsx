import { Plus } from 'react-bootstrap-icons';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useGetChannelsQuery } from '../../slices/channelsSlice';
import { changeChannel } from '../../slices/appSlice';
import { useGetMessagesQuery } from '../../slices/messagesSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const { data: channels = [] } = useGetChannelsQuery();
  const { refetch } = useGetMessagesQuery();
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const getVariantButton = (channel) => (channel.id === currentChannelId ? 'secondary' : 'light');
  const switchChannel = (channel) => {
    const { id, name } = channel;
    if (id !== currentChannelId) {
      dispatch(changeChannel({id, name}));
      refetch();
    }
  };
  return (
    <Col xs="4" md="2" className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button size="sm" variant="outline-primary">
          <Plus />
        </Button>
      </div>
      <Nav className="flex-column nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <Nav.Item key={channel.id}>
            <Button onClick={() => switchChannel(channel)} type="button" className="w-100 text-start rounded-0" variant={getVariantButton(channel)}>{`#${channel.name}`}</Button>
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  );
};

export default Channels;
