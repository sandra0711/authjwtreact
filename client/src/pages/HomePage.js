import React from 'react';
import { Navigate } from 'react-router-dom';

const Homepage = () => {
  return (
    <Navigate replace to="/login" />
  );
}

export default Homepage;
