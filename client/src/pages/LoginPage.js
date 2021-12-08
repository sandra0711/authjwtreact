import React from 'react';
import { NavLink } from 'react-router-dom';
import Login from '../components/Login';

const Loginpage = () => {
  return (
    <div>
      <h1>Логин</h1>
      <Login />
      <p> или
        <NavLink to='/register'>   Регистрация</NavLink>
      </p>
    </div>
  );
}

export default Loginpage;
