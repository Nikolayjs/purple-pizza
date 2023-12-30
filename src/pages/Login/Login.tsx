import { FC, FormEvent, useEffect } from 'react';

import styles from './Login.module.css';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { login, userActions } from '../../store/userSlice';
type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};
const Login: FC = () => {
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
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };
  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  return (
    <div className={styles['login']}>
      <Heading>Вход</Heading>
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
        <Button appearance="big">Вход</Button>
      </form>
      <div className={styles['links']}>
        <div>Нет аккаунта?</div>
        <Link to="/auth/register">Зарегаться</Link>
      </div>
    </div>
  );
};

export default Login;
