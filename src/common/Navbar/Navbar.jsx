import React from 'react';
import { Nav } from '../Nav/Nav';
import './Navbar.css';

export const Navbar = () => {
  return (
    <div className='navbar'>
        <Nav ruta={'Home'} destino={'/'}></Nav>
        <Nav ruta={'Login'} destino={'/auth/login'}></Nav>
        <Nav ruta={'Register'} destino={'/auth/Register'}></Nav>
    </div>
  )
}