import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { userData, logout } from '../Login/userSlice';
import { NavElem } from '../NavElem/NavElem';
import './NavBar.css';

export const NavBar = () => {
  const select = useSelector(userData); //read
  const dispatch= useDispatch(); //write

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to='/'><h1>App</h1></Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          { !select.credenciales.token?
          (
          <>
            <Nav.Link>
              <NavElem ruta={'Login'} destino={'/auth/login'}></NavElem>
            </Nav.Link>
            <Nav.Link href="#link">
              <NavElem ruta={'Register'} destino={'/auth/register'}></NavElem>
            </Nav.Link>
          </>
          ):(
          <>
            <div className='log-panel'>
              <p className='log-name'> Hola {select.credenciales.name}</p>
              <button onClick={()=>dispatch(logout({credenciales:[]}))}>Logout</button>
            </div>
          </>
          )
          }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}