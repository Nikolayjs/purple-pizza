import { FC, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import { userActions, register } from '../../store/userSlice';

import styles from '../Login/Login.module.css';

interface IRegisterForm {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
}

const Register: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { token, loginErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    const target = e.target as typeof e.target & IRegisterForm;
    const { email, password, name } = target;
    await dispatch(register({ email: email.value, password: password.value, name: name.value }));
  };

  return (
    <div className={styles['login']}>
      <Heading>Регистрация</Heading>
      {loginErrorMessage && <div className={styles['error']}>{loginErrorMessage}</div>}
      <form className={styles['form']} onSubmit={submit}>
        <div className={styles['field']}>
          <label htmlFor="email">Ваш email</label>
          <Input id="email" name="email" placeholder="email" />
        </div>
        <div className={styles['field']}>
          <label htmlFor="password">Ваш pass</label>
          <Input id="password" name="password" type="password" placeholder="password" />
        </div>
        <div className={styles['field']}>
          <label htmlFor="name">Ваш name</label>
          <Input id="name" name="name" placeholder="name" />
        </div>
        <Button appearance="big">Вход</Button>
      </form>
      <div className={styles['links']}>
        <div>Есть аккаунт?</div>
        <Link to="/auth/login">Войти</Link>
      </div>
    </div>
  );
};

export default Register;
