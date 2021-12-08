import React from 'react';
import { NavLink } from 'react-router-dom';
import Signup from '../components/SignUp';

const Registerpage = () => {
  return (
    <div>
      <h1>Регистрация</h1>
      <Signup />
      <p> или
        <NavLink to='/login'>   Войти</NavLink>
      </p>
    </div>
  );
}

export default Registerpage;
