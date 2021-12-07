import React from 'react';
import { NavLink } from 'react-router-dom';

const Loginpage = () => {
  return (
    <div>
      <h1>Логин</h1>

      <p> или
        <NavLink to='/register'>   Регистрация</NavLink>
      </p>
    </div>
  );
}

export default Loginpage;
