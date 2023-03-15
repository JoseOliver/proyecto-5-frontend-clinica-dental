import React, { useEffect, useState } from 'react';
import { inputValidate } from '../../helpers/validations';
import './InputText.css';

export const InputText = ({type,placeholder,name, setFunc}) => {

  const errorHandler=(elem)=>{
    let error = inputValidate(elem,data.value);
    setData((prevState)=>({
        ...prevState, 
        error: error
    }));
  }

  const [data,setData]=useState({value:"", error:""});

  // useEffect(()=>{
  //   //falta el update del error
  // },[data.value])

  return (
    <div>
        <input
        className={name}
        type={type} 
        placeholder={placeholder}
        name={name}
        value={data.value}
        onChange={(elem)=>{
          setData((prevState)=>({
            ...prevState, 
            value: elem.target.value
        }));
          setFunc((prevState)=>({
            ...prevState, 
            [elem.target.name]:elem.target.value
        }));
        }}
        onBlur={(elem) => errorHandler(elem)}
        />
        {data.error !== '' && <div>{data.error}</div>}
    </div>
  )
}