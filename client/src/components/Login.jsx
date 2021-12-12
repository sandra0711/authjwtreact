import React from 'react';
import { useDispatch } from 'react-redux';
import Form from './Form';
import { loginUser } from '../store/slicers/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const handleLogin = (email, password) => {
    dispatch(loginUser({ email, password }));
  }
  return (
    <div>
      <Form title='Войти' handlerClick={handleLogin} />
    </div>
  );
}

export default Login;
