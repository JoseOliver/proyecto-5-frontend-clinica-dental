import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { userData, logout } from '../Login/userSlice';
import { NavElem } from '../NavElem/NavElem';
import './Navbar.css';
import { Nav } from 'react-bootstrap';

export const Navbar = () => {
  const select = useSelector(userData); //read
  const dispatch= useDispatch(); //write

  return (

    <Nav variant="tabs" className='.navbar'>
      <Nav.Item>
        <Nav.Link>
          <NavElem ruta={'Home'} destino={'/'}></NavElem>
        </Nav.Link>
      </Nav.Item>
      {!select.credenciales.token?
      (
        <>
          <Nav.Item>
            <Nav.Link>
              <NavElem ruta={'Login'} destino={'/auth/login'}></NavElem>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link>
              <NavElem ruta={'Register'} destino={'/auth/register'}></NavElem>
            </Nav.Link>
          </Nav.Item> 
        </>
      ):
      (
        <Col>
        <div className='log-panel'>
          <p className='log-name'> Hola {select.credenciales.name}</p>
          <button onClick={()=>dispatch(logout({credenciales:[]}))}>Logout</button>
        </div>
        </Col>
      )
      }
    </Nav>
  )
}