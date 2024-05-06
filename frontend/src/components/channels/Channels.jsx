import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import { useGetChannelsQuery } from '../../slices/channelsSlice';
import { changeChannel } from '../../slices/appSlice';
import { useGetMessagesQuery } from '../../slices/messagesSlice';
import NewChannel from './NewChannel';

const Channels = () => {
  const dispatch = useDispatch();
  const { data: channels = [] } = useGetChannelsQuery();
  const { refetch: refetchMessages } = useGetMessagesQuery();
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const getVariantButton = (channel) => (channel.id === currentChannelId ? 'secondary' : 'light');
  const switchChannel = (channel) => {
    const { id, name } = channel;
    if (id !== currentChannelId) {
      dispatch(changeChannel({ id, name }));
      refetchMessages();
    }
  };
  return (
    <Col xs="4" md="2" className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <NewChannel />
      </div>
      <Nav className="flex-column nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <Nav.Item key={channel.id}>
            {channel.removable ? (
              <Dropdown as={ButtonGroup} drop="down" className="w-100">
                <Button onClick={() => switchChannel(channel)} className="text-start" variant={getVariantButton(channel)}>{channel.name}</Button>

                <Dropdown.Toggle className="text-end" split variant={getVariantButton(channel)} id={`dropdown-split-button${channel.id}`} />

                <Dropdown.Menu>
                  <Dropdown.Item>Удалить</Dropdown.Item>
                  <Dropdown.Item>Переименовать</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                as={ButtonGroup}
                variant={getVariantButton(channel)}
                className="w-100 text-start rounded-0"
                onClick={() => switchChannel(channel)}
              >
                {channel.name}
              </Button>
            )}
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  );
};

export default Channels;
