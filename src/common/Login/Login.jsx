import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../services/apiCalls';
import { InputText } from '../InputText/InputText';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Login.css';

import { userData, login } from './userSlice';
import { useDispatch, useSelector } from 'react-redux';

export const Login = () => {

//    const userReduxCredenciales = useSelector(userData);
    const dispatch= useDispatch();
    const select= useSelector(userData);
    const navigate= useNavigate();
    
    const [welcome, setWelcome] = useState("");
    const [credenciales, setCredenciales] = useState({
        name:'',
        email:"",
        password:"",
        token:""
    });
    const [credencialesError, setCredencialesError] = useState({
        emailError:"",
        passwordError:"",
        totalError:''
    });
    // funciones useEffect de ciclo de vida del componente
    // useEffect(()=>{},[])  // funcion que se ejecuta cuando monta el componente

    // useEffect(()=>{})  // funcion que se ejecuta cuando actualiza el componente

    // useEffect(()=>{},[credenciales])   // funcion que se ejecuta solo cuando se actualiza el hook credenciales
    
    // useEffect(()=>{
    //     if(select.credenciales.token){
    //         navigate('/');
    //     }
    // },[])

    useEffect(()=>{
        if(
            credenciales.email!=='' && credenciales.password!== '' &&
            credencialesError.emailError === '' && credencialesError.passwordError==='' &&
            credencialesError.totalError !==''
        ){
            setCredencialesError(prevState => ({
                ...prevState,
                totalError:""
            }));
        }
    },[credencialesError])

    const loginFunc= async()=>{
        if(
            credenciales.email!=='' && credenciales.password!== '' &&
            credencialesError.emailError==='' && credencialesError.passwordError===''
            && credencialesError.totalError===''
        ){
            logIn(credenciales)
            .then((data)=>{
            //             //falta guardar data en el hook de data y navegar a user
                dispatch( login({credenciales:data}));
                setWelcome('Bienvenido de nuevo, '+ data.name + '. Redirigiendo a Home...');
                setTimeout(()=>navigate('/'),2000);
            })
            .catch((error)=>{console.log(error)});
        }else{
            setCredencialesError(prevState => ({
                ...prevState,
                totalError:"No puedes hacer login sin rellenar correctamente los datos"
            }));
        }
    }

    return (
        <Container fluid className='login'>
            <Row>
                <Col>
                    {
                    !select.credenciales.token ?
                    (
                        <div>
                            <p>Login</p>
                            <InputText
                                type="email"
                                name="email" // linea de bindeo con el hook
                                placeholder="Email"
                                setFunc= {setCredenciales}
                                validateFunc= {setCredencialesError}
                            ></InputText>
                            <InputText
                                type="password"
                                name="password"
                                placeholder="Pass"
                                setFunc={setCredenciales}
                                validateFunc= {setCredencialesError}
                            ></InputText>
                            <button className='logButton' onClick={()=>{loginFunc()}}>Login</button>
                            {credencialesError.totalError}
                        </div>
                    ):(
                        <>
                            <div>{welcome}</div>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    )
}