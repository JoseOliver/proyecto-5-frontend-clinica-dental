import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import { Home } from './pages/Home';
import { Register } from './common/Register/Register';
import { Login } from './common/Login/Login';
import { NavBar } from './common/NavBar/Navbar';
import { NavElem } from './common/NavElem/NavElem';

import { Container, Row, Col, Offcanvas } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { userData } from './common/Login/userSlice';

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
          <p className='log-name'> Hola {select.credenciales.name}</p>
          <button onClick={()=>dispatch(logout({credenciales:[]}))}>Logout</button>
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
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}