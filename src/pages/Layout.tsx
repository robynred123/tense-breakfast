import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export const Layout = (props: any) => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
