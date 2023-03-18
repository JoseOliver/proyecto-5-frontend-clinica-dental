import Logo from '../../assets/logo.png';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Nav , Navbar, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { userData, logout } from '../Login/userSlice';
import { NavElem } from '../NavElem/NavElem';
import './NavBar.css';
import Menu from '~icons/mdi/menu'

export const NavBar = (showMenu) => {
  const select = useSelector(userData); //read
  const dispatch= useDispatch(); //write

  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand>
          <Nav.Link><NavElem className='app-title' type='principal' ruta={''} destino={'/'}></NavElem></Nav.Link>
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          
          </Nav>
        </Navbar.Collapse> */}
        { select.credenciales.token ? (
          <div className='log-panel'>
            <p className='log-name'> Hola {select.credenciales.name}</p>
            <Button onClick={()=>dispatch(logout({credenciales:[]}))}>Logout</Button>
          </div>
        ):(
          <div className='log-panel'>
            <Button onClick={showMenu.showMenu}>
              <Menu/>
            </Button>
          </div>
        )}
      </Container>
    </Navbar>
  )
}