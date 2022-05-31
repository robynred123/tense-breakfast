import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { useAppDispatch, useAppSelector } from '../store';
import { Alert } from '@mui/material';
import { clearError } from '../actions/actions';

export const Layout = (props: any) => {
  const { error } = useAppSelector((state) => state.one);
  const dispatch = useAppDispatch();
  return (
    <>
      <Header />
      {error ? (
        <Alert severity='error' onClose={() => dispatch(clearError())}>
          {error}
        </Alert>
      ) : null}
      <Outlet />
    </>
  );
};
