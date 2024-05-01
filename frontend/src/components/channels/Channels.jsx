import { Plus } from 'react-bootstrap-icons';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useGetChannelsQuery } from '../../slices/channelsSlice';

const Channels = () => {
  const { data: channels = [] } = useGetChannelsQuery();
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
            <Button type="button" className="w-100 text-start rounded-0" variant="light">{`#${channel.name}`}</Button>
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  );
};

export default Channels;
