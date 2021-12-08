import React from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slicers/userSlice';
import Form from './Form';

const Login = () => {
  const dispatch = useDispatch();
  const handleLogin = (email, password) => {
    console.log(email, password)
  }
  return (
    <div>
      <Form title='Войти' handlerClick={handleLogin} />
    </div>
  );
}

export default Login;
