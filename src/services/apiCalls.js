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
    const sentBody={
        name:body.name,
        first_surname:body.first_surname,
        second_surname:body.second_surname,
        phone:body.phone,
        address: body.address,
        email: body.email,
        password: body.password
    }
    let data = await axios.post(`${root}/auth/register`, sentBody);
    return data.data;
}

export const getAppointments= async (token)=> {
    let config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    let data = await axios.get(`${root}/appointments/user`, config)
    for( let elem of data.data.data ){
        elem.date= elem.date.slice(0, -1);
    }
    return data;
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

export const updateAppointment = async (body, token) =>{
    let config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    let res = await axios.put(`${root}/appointments`, body, config);
    return res;
}

export const getMyDoctors = async (token) => {
    let config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    let res = await axios.get(`${root}/users/my/doctors`, config);
    return res;
}
export const getMyServices = async (token) => {
    let config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    let res = await axios.get(`${root}/users/my/services`, config);
    return res;
}
export const newAppointment = async (body, token) => {
    let config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    let res = await axios.post(`${root}/appointments`, body, config);
    return res;
}
export const deleteAppointment = async (body, token) => {

    let res = await axios.delete(`${root}/appointments`, {
        headers: {Authorization: `Bearer ${token}`},
        data: body
    });
    return res;
}