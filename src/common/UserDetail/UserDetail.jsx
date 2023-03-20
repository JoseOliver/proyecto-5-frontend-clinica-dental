import React, { useEffect, useState } from 'react'
import { EditableInput } from '../EditableInput/EditableInput'

import { Container, Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { userData } from '../Login/userSlice';

import './UserDetail.css';

export const UserDetail = () => {
    const [userError, setUserError]= useState({
        nameError:'',
        emailError:'',
        passwordError:''
    });
    const [userEditing, setUserEditing] =useState({
        nameEdit:false,
        emailEdit:false,
        passwordEdit:false
    })

    const select = useSelector(userData);
    const navigate = useNavigate();
    
    return (
        <Container>
            <Row>
                <Col>
                    {select.credenciales.token?(
                        <div>
                            <h2>Perfil de {select.credenciales.name}</h2>
                            <div>Nombre: <EditableInput name='name' validateFunc={setUserError} editFunc={setUserEditing}></EditableInput></div>
                            <div>Email: <EditableInput name='email' validateFunc={setUserError}></EditableInput></div>
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