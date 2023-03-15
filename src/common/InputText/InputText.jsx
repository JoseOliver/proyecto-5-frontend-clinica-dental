import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { inputValidate } from '../../helpers/validations';
import './InputText.css';

export const InputText = ({type,placeholder,name, setFunc, validateFunc}) => {

  const inputHandler=(elem)=>{
    setData((prevState)=>({
      ...prevState, 
      value: elem.target.value
    }));
    setFunc((prevState)=>({
      ...prevState, 
      [elem.target.name]:elem.target.value
    }));
    if(data.error!==''){errorHandler(elem)};
  }

  const errorHandler=(elem)=>{
    let error='';
    error = inputValidate(elem.target,elem.target.value);
    setData((prevState)=>({
        ...prevState, 
        error: error
    }));
    validateFunc(
      (prevState)=>({
        ...prevState, 
        [elem.target.name+'Error']: error
    })
    )
  }

  const [data,setData]=useState({value:"", error:""});

  // useEffect(()=>{
  //   //falta el update del error
  // },[data.value])

  return (
    <Container fluid className='input'>
      <Row>
        <Col>
          <input
          type={type} 
          placeholder={placeholder}
          name={name}
          value={data.value}
          onChange={(elem)=>{ inputHandler(elem);
          }}
          onBlur={(elem) => {
            if(data.value!==''){errorHandler(elem)}
          }}
          />
        </Col>
        <Col>
          {data.error !== '' && <div className='message'>{data.error}</div>}
        </Col>
      </Row>
    </Container>
  )
}