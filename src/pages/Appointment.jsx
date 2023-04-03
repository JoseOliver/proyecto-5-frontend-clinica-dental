import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userData } from '../helpers/userSlice'
import { deleteAppointment, getAppointments } from '../services/apiCalls';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { appointmentsData, setAppointments, addSelected } from '../helpers/appointmentsSlice';

export const Appointment = () => {
  const appointments =useSelector(appointmentsData);
  const dispatch = useDispatch();
  const user = useSelector(userData);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user.credenciales.token === undefined)navigate('/auth/login');
    getAppointments(user.credenciales.token)
    .then((_appointments)=>{
      if(_appointments.data.data){
        dispatch(setAppointments({appointments:_appointments.data.data}))
      }
    })
    .catch((error)=>console.log(error));
  },[])
  const click= (_appointment)=>{
    dispatch(addSelected({selected:_appointment}));
    navigate('/user/appointments/detail');
  }
  return (
    <>
      <h2>Citas</h2>
      <Button onClick={()=>navigate('/user/appointments/new')}>Nueva cita</Button>
      <div className='appointments'>
        {
          appointments.appointments.length!==0?
          (
            appointments.appointments.map((appointment)=>{
              return (
                <div className='appointment' key={appointment.id}>
                  Nombre: {appointment.id} - {appointment.Service.name} <br />
                  fecha: {appointment.date} <br />
                  verificada: {appointment.confirmed?'Si':'No'}
                  <div className='centrado'>
                    <Button variant='info' onClick={()=>click(appointment)}>Edita</Button>
                    <Button variant='danger' onClick={()=>deleteAppointment({id:appointment.id},user.credenciales.token)}>Elimina</Button>
                  </div>
                </div>
              );
            })
          ):(
            <div>Sin citas</div>
          )
        }
      </div>
    </>
  )
}