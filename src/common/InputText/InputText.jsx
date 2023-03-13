import React from 'react';
import './InputText.css';

export const InputText = ({type,placeholder,name,changeFunc,blurFunc}) => {
  return (
    <div>
        <input
        className='input'
        type={type} 
        placeholder={placeholder}
        name={name}
        onChange={changeFunc}
        onBlur={blurFunc}
        />
    </div>
  )
}