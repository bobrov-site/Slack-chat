import { Provider } from 'react-redux';
import store from './slices';
import App from './App';

const Init = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Init;
