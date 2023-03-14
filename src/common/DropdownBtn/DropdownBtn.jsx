import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './DropdownBtn.css'

export const DropdownBtn = ({changeFunc, options, title}) => {
    return (
        <>
        <DropdownButton id="dropdown-basic-button" title={title}>
            {options.map((option)=>                
                <Dropdown.Item key={option.id} onClick={()=>changeFunc(option.value)}>{option.name}</Dropdown.Item>
            )}
        </DropdownButton>
        </>
    )
}