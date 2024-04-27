import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { rootReducer } from './slices';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const store = configureStore({
    reducer: rootReducer,
  });
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
