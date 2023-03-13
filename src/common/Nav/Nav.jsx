import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css';

export const Nav = ({ruta, destino}) => {
    const navigate = useNavigate();
    return (
        <div className='nav' onClick={()=> navigate(destino)}>
            {ruta}
        </div>
    )
}