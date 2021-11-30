import React, { FC, useContext, useState } from 'react';
import { Context } from '../index';

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { store } = useContext(Context)

  return (
    <div>
      <input
        type='text'
        placeholder='email'
        value={email}
        onChange={event => setEmail(event.target.value)}
      >
      </input>
      <input
        type='password'
        placeholder='пароль'
        value={password}
        onChange={event => setPassword(event.target.value)}
      >
      </input>
      <button onClick={() => store.login(email, password)}>Логин</button>
      <button onClick={() => store.registration(email, password)}>Регистрация</button>
    </div>
  );
};

export default LoginForm;
