import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';

const RequireAuth: FC<{ children: ReactNode }> = ({ children }) => {
  const token = useSelector((state: RootState) => state.user.token);
  if (!token) {
    return <Navigate to={'/auth/login'} replace />;
  }
  return children;
};

export default RequireAuth;
