import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { userData } from '../Login/userSlice';

import './UserDetail.css';

export const UserDetail = () => {
    const select = useSelector(userData);
    const navigate = useNavigate();
    return (
        <Container>
            <Row>
                <Col>
                    {select.credenciales.token?(
                        <div>
                            <h2>Perfil de {select.credenciales.name}</h2>
                            <p>Nombre: <span>{select.credenciales.name} {select.credenciales.firstSurname} {select.credenciales.secondSurname}</span></p>
                            <p>Email: <span>{select.credenciales.email}</span></p>
                        </div>
                    ):(
                        <div>
                            <p>Todavia no has hecho log in</p>
                            <div className='link' onClick={()=>{navigate('/auth/login')}}>Log in aquí</div>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    )
}