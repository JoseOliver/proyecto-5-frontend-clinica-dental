import React, { useState } from 'react';
import { inputValidate } from '../../helpers/validations';

import { useSelector, useDispatch } from 'react-redux';
import { userData, update } from '../../helpers/userSlice';
import { Button } from 'react-bootstrap';
import './EditableInput.css'
import { updateMe, updateAppointment } from '../../services/apiCalls';
import { appointmentsData, setAppointments } from '../../helpers/appointmentsSlice';
import * as dayjs from 'dayjs'

export const EditableInput = ({name, type, validateFunc, editFunc, data}) => {
    const user= useSelector(userData);
    const select = useSelector(data);
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
    const dispatch = useDispatch();
    const [editStatus,setEditStatus]= useState(true);
    const [value, setValue] = useState(select[contenedor][name]);
    const [error, setError] = useState('');

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
        if(error === ''){
            elem.target.readOnly=true;
            setEditStatus(true);
            let body = {
                id:select.selected.id,
                changes:{
                    [name]:value
                }
            }
            if(data=appointmentsData && name==='date')body.changes.date=dayjs(body.changes.date).format('YYYY-MM-DD hh:mm:ss');
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
                    }
                    }>
                        Edita
                    </Button>
                ):(
                    <>
                        <Button variant="success" onClick={(elem)=>saveInput(elem)}>
                            Guarda
                        </Button>
                        <Button variant="danger" onClick={(elem)=>{
                            setValue(select[contenedor][name]);
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