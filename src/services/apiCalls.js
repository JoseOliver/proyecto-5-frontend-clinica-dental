import axios from 'axios';
import { decodeToken } from 'react-jwt';
const root='https://cdentalp4-production.up.railway.app';

export const bringUsers= async (token) => {
    let config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    let res = await axios.get(`${root}/users`,config);
    return res;
}
export const logMe = async (data) => {
    let sentBody={
        email:data.email,
        password:data.password
    }
    let token = await axios.post(`${root}/auth/login`, sentBody); // esta linea devolverá un token
    token=token.data;
    let userDecoded = decodeToken(token);
    let config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    let me = await getMe(config);
    me.token=token;
    return me;
    // console.log(me.data);
                // dispatch(login({credenciales:{
                //     userId:userDecoded.userId,
                //     roleId:userDecoded.roleId,
                //     token:respuesta.data
                // }}));
    //----------------------------------------------

    // let user= {
    //     name:'Jose',
    //     email:body.email,
    //     password:body.password,
    //     roleId:2,
    //     token:"asdfasdf"
    // };
    // return user;
}
export const register= async (body) => {
    // return await axios.get(root + '/user/auth/register', body); // esta linea devolverá un token
    return body.name+' Registrado';
}

export const getAllUsers= async (body) => {
    return [{id:1,name:'Juan', email: 'juan@juan.com'},{id:2,name:'Roberto', email: 'roberto@roberto.com'}];
}

export const getMe= async (data) => {
    let res = await axios.get(`${root}/users/me`, data);
    return res.data;
}

export const updateMe = async(body, token) =>{
    let config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    let res = await axios.put(`${root}/users/me`, body, config);
    return res;
}