import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { userData, logout } from '../Login/userSlice';
import { Nav } from '../Nav/Nav';
import './Navbar.css';

export const Navbar = () => {
  const select = useSelector(userData); //read
  const dispatch= useDispatch(); //write

  return (
    <Container fluid className='navbar'>
      <Row>
        <Col>
        <h1>App</h1>
        </Col>
        <Col>
          <Nav ruta={'Home'} destino={'/'}></Nav>
        </Col>
      {!select.credenciales.token?
      (
        <>
          <Col>
            <Nav ruta={'Login'} destino={'/auth/login'}></Nav>
          </Col>
          <Col>
            <Nav ruta={'Register'} destino={'/auth/register'}></Nav>
          </Col>
        </>
      ):
      (
        <Col>
        <div className='log-panel'>
          <p> Hola {select.credenciales.name}</p>
          <button onClick={()=>dispatch(logout({credenciales:[]}))}>Logout</button>
        </div>
        </Col>
      )
      }
      </Row>
    </Container>
  )
}