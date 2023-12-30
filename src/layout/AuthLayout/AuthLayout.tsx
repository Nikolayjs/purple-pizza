import { FC } from 'react';

import styles from './AuthLayout.module.css';
import { Outlet } from 'react-router-dom';

const AuthLayout: FC = () => {
  return (
    <div className={styles['layout']}>
      <div className={styles['logo']}>
        <img src="/big-logo.svg" alt="LogoFastCompany" />
      </div>
      <div className={styles['content']}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
