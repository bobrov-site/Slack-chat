import { Provider } from 'react-redux';
import store from './slices';
import App from './App';

const Init = () => (
  <Provider store={store}>
    <div className="h-100 d-flex flex-column justify-content-between">
      <App />
    </div>
  </Provider>
);

export default Init;
