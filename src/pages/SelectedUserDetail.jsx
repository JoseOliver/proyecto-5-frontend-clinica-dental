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
        <div className='margin'>
            <Button onClick={()=>{
                dispatch(addSelected({selected:[]}));
                navigate('/medic');
            }}>Atras</Button>
            <div className='me'>
                <div className="user-elem"><div className="label">Nombre: </div><input type="text" value={users.selected.name} readOnly/></div>
                <div className="user-elem"><div className="label">Apellidos: </div><input type="text" value={users.selected.first_surname} readOnly/><input type="text" value={users.selected.second_surname} readOnly/></div>
                <div className="user-elem"><div className="label">Dirección: </div><input type="text" value={users.selected.address} readOnly/></div>
                <div className="user-elem"><div className="label">Teléfono: </div><input type="text" value={users.selected.phone} readOnly/></div>
                <div className="user-elem"><div className="label">Email: </div><input type="text" value={users.selected.email} readOnly/></div>
            </div>
        </div>
    )
}