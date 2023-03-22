import Logo from '../../assets/logo.png';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Nav , Navbar, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { userData, logout } from '../../helpers/userSlice';
import { NavElem } from '../NavElem/NavElem';
import './Navbar.css';
import Menu from '~icons/mdi/menu'

export const NavBar = (showMenu) => {
  const select = useSelector(userData); //read
  const dispatch= useDispatch(); //write

  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand>
          <Nav.Link><NavElem className='app-title' type='principal' ruta='' destino='/'></NavElem></Nav.Link>
        </Navbar.Brand>
          <div className="log-button">
            { select.credenciales.token && (
              <div className='log-panel-bar'>
                <p className='log-name'> Hola {select.credenciales.name}</p>
                <Button onClick={()=>dispatch(logout({credenciales:[]}))}>Logout</Button>
              </div>
            )}
            <Button onClick={showMenu.showMenu}>
              <Menu/>
            </Button>
          </div>
      </Container>
    </Navbar>
  )
}