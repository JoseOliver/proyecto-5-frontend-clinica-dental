import React, { useState } from 'react';
import { inputValidate } from '../../helpers/validations';

import { useSelector, useDispatch } from 'react-redux';
import { userData, update } from '../Login/userSlice';
import { Button } from 'react-bootstrap';
import './EditableInput.css'

export const EditableInput = ({name, validateFunc, editFunc}) => {
    const user = useSelector(userData);
    const dispatch = useDispatch();
    const [editStatus,setEditStatus]= useState(true);
    const [value, setValue] = useState(user.credenciales[name]);
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
            let data= {
                ...user.credenciales
            };
            data[name]=value;
            console.log(elem.target.value);
            // updateUser(elem.target.name,elem.target.value)
            // .then()
            // .catch((error)=> console.log(error));
            //guardar en base de datos
            dispatch(update({credenciales:data}));
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
            <input type="text" name={name} value={value} onChange={(elem)=>{inputHandler(elem)}} onBlur={(elem)=>{errorHandler(elem)}} readOnly={editStatus}/>
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
                    <Button variant="success" onClick={(elem)=>saveInput(elem)}>
                        Guarda
                    </Button>
                )
            }
            {
                error !== '' && (<div className='error'>{error}</div>)
            }
        </div>
    )
}