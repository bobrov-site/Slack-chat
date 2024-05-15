import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './pages/Signup';
import Header from './components/Header';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_TOKEN_ACCESS,
  environment: 'production',
};
const App = () => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>
);

export default App;
