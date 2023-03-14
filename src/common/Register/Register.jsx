import React, {useState} from 'react';
import { DropdownBtn } from '../DropdownBtn/DropdownBtn';
import { InputText } from '../InputText/InputText';

export const Register = () => {

  let options= [{id:1,name:'Si', value:true},{id:2,name:'No', value:false}];

  const [credenciales, setCredenciales] = useState({
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

const [condicional, setCondicional] = useState(false);

const inputHandler = (elem)=> {
  setCredenciales((prevState)=>({
    ...prevState,
    [elem.target.name]:elem.target.value
  }))
}

const dropdownHandler=(option)=>{
  setCondicional(option);
}

  return (
    <div className='register'>
      Register
      <InputText
          type="text"
          name="name" // linea de bindeo con el hook
          placeholder="Nombre"
          changeFunc={(elem)=>inputHandler(elem)}
          blurFunc={(elem)=>inputValidate(elem)}
      ></InputText>
      <div>
        {credencialesError.nameError}
      </div>

      <InputText
          type="text"
          name="apellido" // linea de bindeo con el hook
          placeholder="Apellido"
          changeFunc={(elem)=>inputHandler(elem)}
          blurFunc={(elem)=>inputValidate(elem)}
      ></InputText>
      <div>
        {credencialesError.apellidoError}
      </div>
      <DropdownBtn 
        changeFunc={(option)=> dropdownHandler(option)} 
        options={options} 
        title={'titulo del drop'}>
      </DropdownBtn>
      {
        condicional && (
          <div>Funciona!</div>
        )
      }

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
      <InputText>
      </InputText>
    </div>
  )
}