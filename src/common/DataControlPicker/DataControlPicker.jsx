import React, { useState } from 'react'
import './DataControlPicker.css'
import * as dayjs from 'dayjs'
import { Button } from 'react-bootstrap';
import { EditableInput } from '../EditableInput/EditableInput';
import { appointmentData } from '../../helpers/appointmentSlice';
import { useSelector } from 'react-redux';

export const DataControlPicker = () => {
    const [edit,setEdit] = useState({
        dateEdit:''
    });
    const appointment= useSelector(appointmentData)
    let midDate= new Date();
    return (
        <div className='new-appointment'>
            <div className='elem'><div className='label'>fecha: </div><EditableInput name='date' type='datetime-local' validateFunc={setappointmentError} editFunc={setEdit} data={appointmentData}></EditableInput></div>
            {edit?(
                <>
                    <Button variant='success' onClick={()=>guardar()}>Guarda</Button>
                    <Button variant='danger'onClick={()=>{
                        setDate(midDate);
                        setEdit(false);
                    }}>Cancela</Button>
                </>
            ):
            (
                <Button variant='info' onClick={()=>{
                    setEdit(true);
                    midDate= date;
                }}>Edita</Button>
            )}
        </div>
    )
}