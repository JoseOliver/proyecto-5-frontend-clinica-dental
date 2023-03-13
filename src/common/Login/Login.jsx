import React, { useState, useEffect } from 'react';
import { InputText } from '../InputText/InputText';
import './Login.css';

export const Login = () => {

    const [credenciales, setCredenciales] = useState({
        email: '',
        password: ''
    });

    const [credencialesError, setCredencialesError] = useState({
        emailError: '',
        passwordError: ''
    });

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
        <div>
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
        </div>
    )
}