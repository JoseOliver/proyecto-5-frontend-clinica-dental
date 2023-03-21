import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bringUsers, logMe } from '../../services/apiCalls';
import { InputText } from '../InputText/InputText';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Login.css';

import { userData, update } from '../../helpers/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export const Login = () => {

//    const userReduxCredenciales = useSelector(userData);
    const dispatch = useDispatch();
    const user= useSelector(userData);
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
            logMe(credenciales)
            .then((respuesta)=>{
                let me={
                    id: respuesta.data.id,
                    name: respuesta.data.name,
                    first_surname: respuesta.data.first_surname,
                    second_surname: respuesta.data.second_surname,
                    email: respuesta.data.email,
                    token: respuesta.token,
                    address: respuesta.data.address,
                    phone: respuesta.data.phone,
                    roleId: respuesta.data.role_id
                }
                dispatch(update({credenciales:me}));
                setWelcome('Bienvenido de nuevo, '+ me.name + '. Redirigiendo a Home...');
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
                    !user.credenciales.token ?
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