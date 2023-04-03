import React, { useEffect, useState } from 'react';
import { inputValidate } from '../../helpers/validations';

import { useSelector, useDispatch } from 'react-redux';
import { userData, update } from '../../helpers/userSlice';
import { Button } from 'react-bootstrap';
import './EditableInput.css'
import { updateMe, updateAppointment } from '../../services/apiCalls';
import { appointmentsData, setAppointments } from '../../helpers/appointmentsSlice';
import * as dayjs from 'dayjs'
import { appointmentData, setNewAppointment } from '../../helpers/appointmentSlice';

export const EditableInput = ({name, type, validateFunc, editFunc, data}) => {

    const user= useSelector(userData);
    const select = useSelector(data);
    const [tempData, setTempData] = useState('');
    let contenedor
    let pushFunc
    if( data === userData ) {
        contenedor= 'credenciales';
        pushFunc =updateMe;
    };
    if( data === appointmentsData){ 
        contenedor= 'selected';
        pushFunc = updateAppointment;
    };
    if (data === appointmentData){
        contenedor = 'appointment';
    }
    const dispatch = useDispatch();
    const [editStatus,setEditStatus]= useState(true);
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    useEffect(()=>{
        if(value==='')setValue(select[contenedor][name]);
    });

    const inputHandler =(elem)=>{ 
        setValue(elem.target.value);
        if(error!==''){errorHandler(elem)};
    }
    const errorHandler =(elem)=>{
        let error='';
        error = inputValidate(elem.target,elem.target.value);
        setError(error);
        validateFunc(
            (prevState)=>({
                ...prevState, 
                [elem.target.name+'Error']: error
            }));
    }
    const saveInput = (elem) =>{
        if(data===appointmentsData && name==='date'){
            let body = {
                id:select.selected.id,
                changes:{
                    [name]:value
                }
            };
            body.changes.date=dayjs(body.changes.date).format('YYYY-MM-DD hh:mm:ss');
            pushFunc(body, user.credenciales.token)
            .then((res)=>{
                if(data === userData)dispatch(update({[name]:value}));
                if(data === appointmentsData)dispatch(setAppointments({[name]:value}));
                
            })
            .catch((error)=>{console.log(error)});
            editFunc(
                (prevState)=>({
                    ...prevState, 
                    [name+'Edit']:false
                })
                );
            }
            if(data ===appointmentData && name==='date'){
                editFunc(
                    (prevState)=>({
                        ...prevState, 
                        [name+'Edit']:false
                    })
                    );
            }
            if(error === ''){
                elem.target.readOnly=true;
                setEditStatus(true);
            }
        }
            return (
                <div className='editableInput'>
            <input type={type} name={name} value={value} onChange={(elem)=>{inputHandler(elem)}} onBlur={(elem)=>{errorHandler(elem)}} readOnly={editStatus}/>
            {
                editStatus?
                (
                    <Button variant="info" onClick={(elem)=>{
                        setEditStatus(false);
                        editFunc(
                            (prevState)=>({
                                ...prevState, 
                                [name+'Edit']:true
                            })
                        );
                        setTempData(value);
                    }}>
                        Edita
                    </Button>
                ):(
                    <>
                        <Button variant="success" onClick={(elem)=>saveInput(elem)}>
                            Guarda
                        </Button>
                        <Button variant="danger" onClick={(elem)=>{
                            setValue(tempData);
                            setError('');
                            setEditStatus(true);
                        }}>
                            Cancela
                        </Button>
                    </>
                )
            }
            {
                error !== '' && (<div className='error'>{error}</div>)
            }
        </div>
    )
}