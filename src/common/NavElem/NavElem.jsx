import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavElem.css';

export const NavElem = ({ruta, destino}) => {
    const navigate = useNavigate();
    return (
        <div className='nav-elem' onClick={()=> navigate(destino)}>
            {ruta}
        </div>
    )
}