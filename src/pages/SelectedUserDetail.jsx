import React from 'react'
import { useSelector } from 'react-redux';
import { usersData } from '../helpers/usersSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export const SelectedUserDetail = () => {

    const users = useSelector(usersData);
    const navigate = useNavigate();

    return (
        <>
            <Button onClick={()=>navigate(-1)}>Atras</Button>
            <div>{users.selected.name}</div>
        </>
    )
}