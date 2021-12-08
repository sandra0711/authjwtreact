import React from 'react';
import { useDispatch } from 'react-redux';
import Form from './Form';

const Signup = () => {
  const dispatch = useDispatch();
  const handlerSignup = (email, password) => {
    console.log(email, password)
  }
  return (
    <div>
      <Form title='Зарегистрироваться' handlerClick={handlerSignup} />
    </div>
  );
}

export default Signup;
