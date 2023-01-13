/* eslint-disable react/react-in-jsx-scope */
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const PrivateRoutes = () => {
  console.log('check route');
  const userDataCookie = cookies.get('userData');
  return userDataCookie ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoutes;
