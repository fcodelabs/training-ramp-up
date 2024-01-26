import { Route } from 'react-router-dom';
import UserDetails from './pages/UserDetails';

const routes = (
  <>
    <Route path="/" element={<UserDetails />} />
    <Route path="/userdetail" element={<UserDetails />} />
  </>
);

export default routes;