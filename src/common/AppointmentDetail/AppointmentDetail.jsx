import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { appointmentsData, addSelected } from '../../helpers/appointmentsSlice';
import { userData } from '../../helpers/userSlice';
import { EditableInput } from '../EditableInput/EditableInput'
import { Button } from 'react-bootstrap';

export const AppointmentDetail = () => {
  const appointments = useSelector(appointmentsData);
  const user = useSelector(userData);
  const dispatch = useDispatch();
  const [nombreCita, setNombreCita]= useState('');

  const [appointmentError, setappointmentError]= useState({
    dateError:'',
    emailError:'',
    passwordError:''
  });
  const [appointmentEditing, setappointmentEditing] =useState({
    dateEdit:false,
    emailEdit:false,
    passwordEdit:false
  })
  const navigate = useNavigate();
  useEffect(()=>{
    if(appointments.selected === '')navigate('/user/appointments');
    if(user.credenciales.token === undefined)navigate('/auth/login');
    setNombreCita(appointments.selected.id +' - ' + appointments.selected.Service.name);
  },[])
  useEffect(()=>{
    if(user.credenciales.token === undefined)navigate('/auth/login');
  },[user])
  useEffect(()=>{
    if(appointments.selected === undefined)navigate('/user/appointments');
  },[appointments])

  return (
    <div>
        <h2>
            Detalle de cita
        </h2>
        <Button onClick={()=>{
          dispatch(addSelected({selected:{}}));
          navigate('/user/appointments');
        }}>Atras</Button>
          <div className='elem'><div className='label'>Cita: </div><input name='id' type='text' defaultValue={nombreCita} readOnly/></div>
          <div className='elem'><div className='label'>fecha: </div><EditableInput name='date' type='datetime-local' validateFunc={setappointmentError} editFunc={setappointmentEditing} data={appointmentsData}></EditableInput></div>
          <div className='elem'><div className='label'>Verificada: </div><input type='text' defaultValue={appointments.selected.confirmed?'Si':'No'} readOnly/></div>
          
        <div className="servicio">
          <h3>Servicio</h3>
          <div className='elem'><div className="label">clase: </div><input type="text" defaultValue={appointments.selected.Service.name} readOnly/></div>
          <div className='elem'><div className="label">Precio: </div><input type="text" defaultValue={appointments.selected.Service.price} readOnly/>€</div>
        </div>
        <div className="medico">
          <h3>Médico</h3>
          <div className='elem'><div className="label">nombre: </div><input type="text" defaultValue={appointments.selected.Doctor.User.name + ' ' + appointments.selected.Doctor.User.first_surname} readOnly/></div>
        </div>
    </div>
  )
}