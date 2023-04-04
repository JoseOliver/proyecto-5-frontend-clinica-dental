import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './NewAppointment.css';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../helpers/userSlice';
import { EditableInput } from '../EditableInput/EditableInput';
import { appointmentData, setNewAppointment } from '../../helpers/appointmentSlice';
import * as dayjs from 'dayjs'
import { getMyDoctors, getMyServices, newAppointment } from '../../services/apiCalls';

export const NewAppointment = () => {
    const [appointmentError, setAppointmentError]= useState({
        dateError:'',
        totalError:''
    });
    const [appointmentEdit, setAppointmentEdit]= useState({
        dateEdit:''
    });
    const dispatch= useDispatch();
    const user = useSelector(userData);
    const appointment= useSelector(appointmentData);
    const navigate = useNavigate();
    const [doctors,setDoctors]= useState([]);
    const [services, setServices] =useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');

    useEffect(()=>{
            if(user.credenciales.token === undefined)navigate('/auth/login')
            else{
                dispatch(setNewAppointment({appointment:{date:dayjs().format('YYYY-MM-DDThh:mm')}}));
                getMyDoctors(user.credenciales.token)
                .then(res=>{
                    let _doctors=[];
                    res.data.data.map(doctor=>{
                        _doctors.push(doctor);
                    });
                    setDoctors(_doctors);
                })
                .catch((error)=>console.log(error));
                getMyServices(user.credenciales.token)
                .then(res => {
                    setServices(res.data.data);
                })
                .catch(error=> console.log (error));
            }
    },[]);

    const handleServiceSelection = (selected) => {
        const selectedValue=selected.target.options[selected.target.selectedIndex].value;
        const selectedService = services.find(item => item.id == selectedValue);
        if(selected.target.selectedIndex===0)setSelectedService('');
        else setSelectedService(selectedService);
    };
    const handleDoctorSelection = (selected) => {
        const selectedValue=selected.target.options[selected.target.selectedIndex].value;
        const selectedDoctor = doctors.find(item => item.id == selectedValue);
        if(selected.target.selectedIndex===0)setSelectedDoctor('')
        else setSelectedDoctor(selectedDoctor);
    };

    const saveAppointment = () => {
        if(selectedService !== '' && selectedDoctor!== ''){
            let body={
                date: dayjs(appointment.appointment.date).format('YYYY-MM-DDThh:mm:00Z'),
                service_id: selectedService.id,
                doctor_id:selectedDoctor.doctor_id
            };
            newAppointment(body, user.credenciales.token)
            .then(res=>navigate('/user/appointments'))
            .catch(error=> console.log(error));
        }
    };

    return (
        <>
            <h3>Nueva cita</h3>
            <Button onClick={()=>navigate('/user/appointments')}>Atras</Button>
            <div>
                <div className='elem'><div className='label'>fecha: </div><EditableInput name='date' type='datetime-local' validateFunc={setAppointmentError} editFunc={setAppointmentEdit} data={appointmentData}></EditableInput></div>
                <div className='elem'><div className='label'> Doctores:</div><select className='doctores' name="doctores" id="doctores" onChange={selected => handleDoctorSelection(selected)}>
                    <option value="error">Elige doctor</option>
                    {
                        doctors.map(doctor=>(
                            <option key={doctor.id} value={doctor.id}>{doctor.name + " " + doctor.first_surname}</option>
                        ))
                    }
                </select>
                </div>
                <div className='elem'><div className='label'> Servicios:</div><select className='services' name="servicios" id="servicios" onChange={selected=>handleServiceSelection(selected)}>
                    <option value="error">Elige servicio</option>
                    {
                        services.map(service=>(
                            <option key={service.id} value={service.id}>{service.name}</option>
                        ))
                    }
                </select>
                </div>
                <div className="service">
                <div className='elem'><div className='label'>Precio: </div>{selectedService.price}</div>
                <div className='elem'><div className='label'>detalles: </div>{selectedService.description}</div>
                </div>
                <Button onClick={()=>saveAppointment()}>Guarda</Button>{appointmentError.totalError}
            </div>
        </>
    );
}