import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { usersData, addSelected } from '../helpers/usersSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export const SelectedUserDetail = () => {

    const users = useSelector(usersData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(users.selected.length === 0){
            navigate('/medic');
        }
    },[users]);
    return (
        <>
            <Button onClick={()=>{
                dispatch(addSelected({selected:[]}));
                navigate(-1);
            }}>Atras</Button>
            <div>{users.selected.name}</div>
        </>
    )
}