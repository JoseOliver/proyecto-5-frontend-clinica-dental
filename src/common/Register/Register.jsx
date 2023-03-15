import React, {useState} from 'react';
import { DropdownBtn } from '../DropdownBtn/DropdownBtn';
import { InputText } from '../InputText/InputText';

export const Register = () => {

  let options= [{id:1,name:'Paciente', value:'paciente'},{id:2,name:'Médico', value:'medico'}];

  const [registro, setRegistro] = useState({
    name: '',
    apellido:'',
    direccion:'',
    email: '',
    password: ''
});

const [credencialesError, setCredencialesError] = useState({
    nameError: '',
    apellidoError: '',
    direccionError: '',
    emailError: '',
    passwordError: ''
});

const [rol, setRol] = useState('paciente');

  return (
    <div className='register'>
      Register
      {JSON.stringify(registro)}
      <InputText
          type="text"
          placeholder="Nombre"
          name="name" // linea de bindeo con el hook
          setFunc={setRegistro}
      ></InputText>

      <InputText
          type="text"
          name="apellido" // linea de bindeo con el hook
          placeholder="Apellido"
          setFunc={setRegistro}
      ></InputText>
      <DropdownBtn 
        setFunc={setRol} 
        options={options} 
        title={'¿Eres paciente o doctor?'}>
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
      ></InputText>
      <div>
        {credencialesError.emailError}
      </div>

      <InputText
          type="password"
          name="password"
          placeholder="Pass"
          setFunc={setRegistro}
      ></InputText>
    </div>
  )
}