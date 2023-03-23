import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../helpers/userSlice'
import { getAppointments } from '../services/apiCalls';

export const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const user = useSelector(userData);
  useEffect(()=>{
    getAppointments(user.credenciales.token)
    .then((_appointments)=>{
      if(_appointments.data.data){
        setAppointments(_appointments.data.data);
      }
    })
    .catch((error)=>console.log(error));
  },[])
  const click= (_appointment)=>{
    console.log(_appointment);
  }
  return (
    <>
      <h2>Citas</h2>
      <div className='appointments'>
        {
          appointments.length!==0?
          (
            appointments.map((appointment)=>{
              return <div className='appointment' key={appointment.id} onClick={()=>click(appointment)}>
                Nombre: cita con id: {appointment.id} <br />
                fecha: {appointment.date} <br />
              </div>
            })
          ):(
            <div>Cargando...</div>
          )
        }
      </div>
    </>
  )
}