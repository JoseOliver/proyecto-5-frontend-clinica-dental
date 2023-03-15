import React, { useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './DropdownBtn.css'

export const DropdownBtn = ({setFunc, options, title}) => {
    const [selected,setSelected]= useState(options[0].name);
    return (
        <Container fluid className='dropdown'>
            <Row>
                <Col>
                    <DropdownButton id="dropdown-basic-button" title={title}>
                        {options.map((option)=>                
                            <Dropdown.Item key={option.id} onClick={()=>{
                                setFunc(option.value);
                                setSelected(option.name);
                            }}>{option.name}</Dropdown.Item>
                        )}
                    </DropdownButton>
                </Col>
                <Col>
                    <div className='dropdown-label'>
                        {selected}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}