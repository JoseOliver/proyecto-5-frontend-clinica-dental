import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/apiCalls';
import { DropdownBtn } from '../DropdownBtn/DropdownBtn';
import { InputText } from '../InputText/InputText';
import './Register.css'

export const Register = () => {

  let options= [{id:1,name:'Paciente', value:'paciente'},{id:2,name:'Médico', value:'medico'}];
  let navigate = useNavigate();

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
      .then((body)=>{
        setMensaje('Ususario '+ body.data.name + ' registrado');
        navigate('/auth/login');
      })
      .catch((error)=>setMensaje(error));
    }
  }

  return (
    <div className='bg bg-register' style={{backgroundImage: `url('../src/assets/clinica_register.jpg')`}}>
      {mensaje === '' ?(
        <div className='register'>
          <h2>Register</h2>
          <InputText
              type="text"
              placeholder="Nombre"
              name="name" // linea de bindeo con el hook
              setFunc={setRegistro}
              validateFunc={setRegistroError}
          ></InputText>
    
          <InputText
              type="text"
              name="first_surname" // linea de bindeo con el hook
              placeholder="Primer apellido"
              setFunc={setRegistro}
              validateFunc={setRegistroError}
          ></InputText>
          <InputText
              type="text"
              name="second_surname" // linea de bindeo con el hook
              placeholder="Segundo apellido"
              setFunc={setRegistro}
              validateFunc={setRegistroError}
          ></InputText>
          <InputText
              type="text"
              name="phone" // linea de bindeo con el hook
              placeholder="Teléfono"
              setFunc={setRegistro}
              validateFunc={setRegistroError}
          ></InputText>
          <InputText
              type="text"
              name="address" // linea de bindeo con el hook
              placeholder="Dirección"
              setFunc={setRegistro}
              validateFunc={setRegistroError}
          ></InputText>
          {/* <DropdownBtn 
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
          } */}
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
    </div>
  )
}