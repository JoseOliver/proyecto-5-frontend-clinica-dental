import React, {useState} from 'react';
import { register } from '../../services/apiCalls';
import { DropdownBtn } from '../DropdownBtn/DropdownBtn';
import { InputText } from '../InputText/InputText';
import './Register.css'

export const Register = () => {

  let options= [{id:1,name:'Paciente', value:'paciente'},{id:2,name:'Médico', value:'medico'}];

  const [registro, setRegistro] = useState({
    name: '',
    apellido:'',
    direccion:'',
    email: '',
    password: ''
  });

  const [registroError, setRegistroError] = useState({
      nameError: '',
      apellidoError: '',
      direccionError: '',
      emailError: '',
      passwordError: ''
  });

  const [rol, setRol] = useState('paciente');
  const [mensaje,setMensaje]= useState('');

  const registerFunc=()=>{
    if( registro.password !== '' && registroError.passwordError===''){
      register(registro)
      .then((body)=>setMensaje(body))
      .catch((error)=>setMensaje(error));
    }
  }

  return (
    <>
      {mensaje === '' ?(
        <div className='register'>
          <p>Register</p>
          <InputText
              type="text"
              placeholder="Nombre"
              name="name" // linea de bindeo con el hook
              setFunc={setRegistro}
              validateFunc={setRegistroError}
          ></InputText>
    
          <InputText
              type="text"
              name="apellido1" // linea de bindeo con el hook
              placeholder="Apellido"
              setFunc={setRegistro}
              validateFunc={setRegistroError}
          ></InputText>
          <DropdownBtn 
            setFunc={setRol} 
            options={options} 
            title={'¿Paciente o doctor?'}>
          </DropdownBtn>
          {
            rol==='paciente' && (
              <div>Cosas de paciente</div>
            )
          }
          {
            rol==='medico' && (
              <div>Cosas de medico</div>
            )
          }
          <InputText
              type="email"
              name="email" // linea de bindeo con el hook
              placeholder="Email"
              setFunc={setRegistro}
              validateFunc={setRegistroError}
          ></InputText>
          <InputText
              type="password"
              name="password"
              placeholder="Pass"
              setFunc={setRegistro}
              validateFunc={setRegistroError}
          ></InputText>
          <button className='regButton' onClick={()=>{registerFunc()}}>Register</button>
        </div>
      ):(
        <div>{mensaje}</div>
      )}
    </>
  )
}