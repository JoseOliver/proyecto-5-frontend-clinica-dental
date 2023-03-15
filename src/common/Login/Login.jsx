import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../services/apiCalls';
import { InputText } from '../InputText/InputText';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Login.css';

export const Login = () => {

    const navigate= useNavigate();
    
    const [message, setMessage] = useState("");
    const [credenciales, setCredenciales] = useState({
        email:"",
        password:""
    });
    const [credencialesError, setCredencialesError] = useState({
        emailError:"",
        passwordError:""
    });
    // funciones useEffect de ciclo de vida del componente
    // useEffect(()=>{},[])  // funcion que se ejecuta cuando monta el componente

    // useEffect(()=>{})  // funcion que se ejecuta cuando actualiza el componente

    // useEffect(()=>{},[credenciales])   // funcion que se ejecuta solo cuando se actualiza el hook credenciales
    const set= (e) => {
        // let data={};
        // for(let input of inputs){
        //     data[input]=document.querySelector('.'+input).value;
            
        //     console.log(input +" "+ data[input])
        // }
        // console.log(data);


        setCredenciales((prevState)=>({
            ...prevState, 
            [e.target.name]: e.target.value
        }))
        console.log(credenciales);
    }

    
    const loginFunc= async()=>{
        logIn(credenciales)
        .then((data)=>{
        //             //falta guardar data en el hook de data y navegar a user
        setMessage('Bienvenido de nuevo, '+ credenciales.email)
        })
        .catch((error)=>{console.log(error)});
    }

    return (
        <Container fluid className='login'>
            <Row>
                <Col>
                    {message === ""?(
                        <div>
                            <p>Login</p>
                            <InputText
                                type="email"
                                name="email" // linea de bindeo con el hook
                                placeholder="Email"
                                setFunc= {setCredenciales}
                            ></InputText>
                            <InputText
                                type="password"
                                name="password"
                                placeholder="Pass"
                                setFunc={setCredenciales}
                            ></InputText>
                            <button className='logButton' onClick={()=>{loginFunc()}}>Login</button>
                        </div>
                    ):(
                        <div>{message}</div>
                    )}
                </Col>
            </Row>
        </Container>
    )
}