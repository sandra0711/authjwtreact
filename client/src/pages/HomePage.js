import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/slicers/userSlice';

const Homepage = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <button onClick={() => handleLogout()}>Выйти</button>
  );
}

export default Homepage;
