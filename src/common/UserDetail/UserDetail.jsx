import React, { useEffect, useState } from 'react'
import { EditableInput } from '../EditableInput/EditableInput'

import { Container, Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { userData } from '../../helpers/userSlice';

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
                        <div className='me'>
                            <h2>Perfil de {select.credenciales.name}</h2>
                            <div className='user-elem'><div className='label'>Nombre: </div><EditableInput name='name' validateFunc={setUserError} editFunc={setUserEditing}></EditableInput></div>
                            <div className='user-elem'><div className='label'>Apellido 1: </div><EditableInput name='first_surname' validateFunc={setUserError} editFunc={setUserEditing}></EditableInput></div>
                            <div className='user-elem'><div className='label'>Apellido 2: </div><EditableInput name='second_surname' validateFunc={setUserError} editFunc={setUserEditing}></EditableInput></div>
                            <div className='user-elem'><div className='label'>Dirección: </div><EditableInput name='address' validateFunc={setUserError} editFunc={setUserEditing}></EditableInput></div>
                            <div className='user-elem'><div className='label'>Teléfono: </div><EditableInput name='phone' validateFunc={setUserError} editFunc={setUserEditing}></EditableInput></div>
                            <div className='user-elem'><div className='label'>Email: </div><input type="text" value={select.credenciales.email} readOnly/></div>
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