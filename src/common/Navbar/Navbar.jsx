import React from 'react';
import { Container } from 'react-bootstrap';
import { Nav } from '../Nav/Nav';
import './Navbar.css';

export const Navbar = () => {
  return (
    <Container fluid className='navbar'>
      <Row>
        <Col>
          <Nav ruta={'Home'} destino={'/'}></Nav>
          <Nav ruta={'Login'} destino={'/auth/login'}></Nav>
          <Nav ruta={'Register'} destino={'/auth/register'}></Nav>
        </Col>
      </Row>
    </Container>
  )
}