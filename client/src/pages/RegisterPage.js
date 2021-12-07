import React from 'react';
import { NavLink } from 'react-router-dom';

const Registerpage = () => {
  return (
    <div>
      <h1>Регистрация</h1>

      <p> или
        <NavLink to='/login'>   Войти</NavLink>
      </p>
    </div>
  );
}

export default Registerpage;
