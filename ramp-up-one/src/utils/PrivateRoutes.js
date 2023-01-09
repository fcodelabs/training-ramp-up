/* eslint-disable react/react-in-jsx-scope */
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const userDataCookie = cookies.get('userData');

const PrivateRoutes = () => {
  return userDataCookie !== null ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoutes;
  