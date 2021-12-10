import React from 'react';
import { useDispatch } from 'react-redux';
import Form from './Form';
import { addNewUser } from '../store/slicers/userSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const handlerSignup = (email, password) => {
    dispatch(addNewUser({ email, password }));
  };
  return (
    <div>
      <Form title='Зарегистрироваться' handlerClick={handlerSignup} />
    </div>
  );
}

export default Signup;
