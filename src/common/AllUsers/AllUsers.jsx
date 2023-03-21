import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userData } from '../../helpers/userSlice';
import { usersData, addAll, addSelected } from '../../helpers/usersSlice';
import { bringUsers } from '../../services/apiCalls';

export const AllUsers = () => {
  const user = useSelector(userData);
  const users = useSelector(usersData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(user.credenciales.roleId!==3) navigate('/');
    else{
      bringUsers(user.credenciales.token)
      .then((res)=>{
        dispatch(addAll({users:res.data.data}));
      })
      .catch((error)=>console.log(error));
    }
  },[user]);

  const click = (_user)=>{
    dispatch(addSelected({selected:_user}));
    navigate('/medic/user');
  }

  return (
    <div>
      { user.credenciales.roleId === 3 ?
      (
        <div>
          <h2>
            Medic Panel
          </h2>
          <h3>Users:</h3>
          <div className="users">
            {
              
              users.users.map((user_i)=>{
                return (<div className='user' key={user_i.id} onClick={()=>click(user_i)}>  
                  nombre: {user_i.name} <br />
                  email: {user_i.email} <br />
                </div>)
              })
            }
          </div>
        </div>
      ):(
        <div> No puedes estar aqui</div>
      )}
    </div>
  )
}