import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Nav } from '../Nav/Nav';
import './Navbar.css';

export const Navbar = () => {
  return (
    <Container fluid className='navbar'>
      <Row>
        <Col>
        <h1>App</h1>
        </Col>
        <Col>
          <Nav ruta={'Home'} destino={'/'}></Nav>
        </Col>
        <Col>
          <Nav ruta={'Login'} destino={'/auth/login'}></Nav>
        </Col>
        <Col>
          <Nav ruta={'Register'} destino={'/auth/register'}></Nav>
        </Col>
      </Row>
    </Container>
  )
}