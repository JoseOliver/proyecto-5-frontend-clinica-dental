import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Register } from './common/Register/Register';
import { Login } from './common/Login/Login';
import { NavBar } from './common/NavBar/Navbar';
import { NavElem } from './common/NavElem/NavElem';
import { User } from './pages/User';

import { Container, Row, Col, Offcanvas, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { userData, logout } from './common/Login/userSlice';
import './App.css'

export const App = () => {

  const [show, setShow] = useState(false);
  const select = useSelector(userData);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container fluid className="App">
      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        { !select.credenciales.token? (
        <>
            <NavElem ruta={'Login'} destino={'/auth/login'} click={handleClose}></NavElem>
            <NavElem ruta={'Register'} destino={'/auth/register'} click={handleClose}></NavElem>
        </>
        ):
        (
        <>
          <div className='log'>
            <p className='log-name'> Hola {select.credenciales.name}</p>
            <Button onClick={()=>dispatch(logout({credenciales:[]}))}>Logout</Button>
          </div>
          <NavElem ruta='Usuario' destino='/user' click={handleClose}></NavElem>
        </>
        )}
        </Offcanvas.Body>
      </Offcanvas>
      <Row>
        <Col>
          <NavBar showMenu={handleShow}></NavBar>
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/auth/login' element={<Login></Login>}></Route>
            <Route path='/auth/register' element={<Register></Register>}></Route>
            <Route path='/user' element={<User></User>}></Route>
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}