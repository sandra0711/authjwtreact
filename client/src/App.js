import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/HomePage';
import Loginpage from './pages/LoginPage';
import Registerpage from './pages/RegisterPage';

function App() {
  return (
    <Routes>
      <Route exact path='/login' element={<Loginpage />} />
      <Route exact path='/register' element={<Registerpage />} />
      <Route exact path='/' element={<Homepage />} />
    </Routes>
  );
}

export default App;
