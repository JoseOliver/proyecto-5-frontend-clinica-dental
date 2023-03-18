import Logo from '../../assets/logo.png'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavElem.css';

export const NavElem = ({ruta, destino, className, type, click}) => {
    const navigate = useNavigate();
    return (
        <div className={className || 'nav-elem'} onClick={()=> {
            if(click) click();
            navigate(destino);
            }}>
            {ruta}{type==='principal' && (
                <div className='logo'>
                    <img className='logo-img' src={Logo} alt='logo'/>
                    <h1 className='app-title'>ToothMaster</h1>
                </div>
            )}
        </div>
    )
}