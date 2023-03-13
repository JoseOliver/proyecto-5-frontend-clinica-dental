import reactLogo from './assets/react.svg'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import { Home } from './pages/Home';
import { Register } from './common/Register/Register';
import { Login } from './common/Login/Login';
import { Navbar } from './common/NavBar/Navbar';

export const App = () => {
  return (
  <>
    <div className="App">
      <h1>App</h1>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/auth/login' element={<Login></Login>}></Route>
        <Route path='/auth/about' element={<Register></Register>}></Route>
      </Routes>
    </div>
  </>
  );
}