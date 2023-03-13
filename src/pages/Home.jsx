import React , { useState, useEffect } from 'react'
import { Navbar } from '../common/NavBar/Navbar'
import { bringUsers } from '../services/apiCalls';

export const Home = () => {
    const [users, setUsers]= useState([]);

    useEffect(()=>{
        if(users.length===0){
            bringUsers()
            .then((info)=>{
                setUsers(info.data.users);
            })
            .catch((error)=>{console.log(error)});
        }
    },[users]);
    return (
        <div>
            {/* {users.length>0 ? (
                // div si hay datos
                <div className='listaUsuario'>
                    {users.map( usuario => {
                        return (
                            <p key={usuario.id}>{usuario.firstName}</p>
                        )
                    })}
                </div>
            ) : (
                // div si no hay datos
                <div>Cargando usuarios...</div>
            )} */}
        </div>
    )
}