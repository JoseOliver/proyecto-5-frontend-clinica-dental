import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../services/apiCalls';
import { InputText } from '../InputText/InputText';
import './Login.css';

export const Login = () => {

    const navigate= useNavigate();
    const [credenciales, setCredenciales] = useState({
        email: '',
        password: ''
    });

    const [credencialesError, setCredencialesError] = useState({
        emailError: '',
        passwordError: ''
    });

    const [message, setMessage] = useState("");
    // funciones useEffect de ciclo de vida del componente
    // useEffect(()=>{},[])  // funcion que se ejecuta cuando monta el componente

    // useEffect(()=>{})  // funcion que se ejecuta cuando actualiza el componente

    // useEffect(()=>{},[credenciales])   // funcion que se ejecuta solo cuando se actualiza el hook credenciales

    const inputHandler=(elem)=>{
        setCredenciales((prevState)=>({
            ...prevState, 
            [elem.target.name]: elem.target.value
        }));
    }
    const errorHandler=(elem)=>{
        setCredencialesError((prevState)=>({
            ...prevState, 
            passwordError : "Debes escribir como mínimo 8 caracteres"
        }));
    }
    const loginFunc= async()=>{
        if(credencialesError.emailError==="" && credencialesError.passwordError===""){
            logIn(credenciales)
            .then((data)=>{
                    //falta guardar data en el hook de data y navegar a user
                setMessage('Bienvenido de nuevo, '+ data.name)
            })
            .catch((error)=>{console.log(error)})
        }
    }
    const inputValidate= (elem) => {
        switch(elem.target.name){
            case "email":
            break;
            case "password":
                if(credenciales.password.length<8){
                    errorHandler();
                }else{
                    setCredencialesError((prevState) => ({
                        ...prevState,
                        passwordError : "",
                    }));
                }
            break;
        }
    }
    return (
        <div className='login'>
            {message === ""?(
                <>
                Login
                <InputText
                    type="email"
                    name="email" // linea de bindeo con el hook
                    placeholder="Email"
                    changeFunc={(elem)=>inputHandler(elem)}
                    blurFunc={(elem)=>inputValidate(elem)}
                ></InputText>
                <div>
                    {credencialesError.emailError}
                </div>
                <InputText
                    type="password"
                    name="password"
                    placeholder="Pass"
                    changeFunc={(elem)=>inputHandler(elem)}
                    blurFunc={(elem)=>inputValidate(elem)}
                ></InputText>
                <div>
                    {credencialesError.passwordError}
                </div>
                <button className='logButton' onClick={()=>{loginFunc()}}>Login</button>
                </>
            ):(
                <div>{message}</div>
            )}
        </div>
    )
}