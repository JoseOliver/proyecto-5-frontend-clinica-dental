import axios from 'axios';
const root='localhost:3000';
export const bringUsers= async () => {
    return await axios.get("https://dummyjson.com/users");
}
export const logIn= async (body) => {
    // return await axios.get(root + '/user/auth/login', body); // esta linea devolverá un token
    return {
        name:"Jose"
    };
}