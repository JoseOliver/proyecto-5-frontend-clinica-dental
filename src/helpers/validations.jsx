import * as dayjs from 'dayjs'

export const inputValidate= (elem,data) => {
    switch(elem.name){
        case 'name':
            if(data.length > 20){
                return "Nombre incorrecto (tiene mas de 20 caracteres)";
            }else if(data.length ==0){
                return "Nombre incorrecto (sin caracteres)";
            }else{
                return "";
            }
        case 'first_surname':
        case 'apellido1':
            if(data.length > 20){
                return "Apellido incorrecto (tiene mas de 20 caracteres)";
            }else if(data.length ==0){
                return "Apellido incorrecto (sin caracteres)";
            }else{
                return "";
            }
        case 'second_surname':
            case 'apellido2':
                if(data.length > 20){
                    return "Apellido incorrecto (tiene mas de 20 caracteres)";
                }else if(data.length ==0){
                    return "Apellido incorrecto (sin caracteres)";
                }else{
                    return "";
                }
        case "email":
        const emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(emailregex.test(data)){
                return "";
            }else{
                return "Email incorrecto";
            }
        case "password":
            if(data.length < 3){
                return "Password tiene que tener al menos 3 caracteres";
            }else{
                return "";
            }
        case "phone":
            if(data.length > 15){
                return "telefono muy largo (mas de 15 caracteres)";
            }else{
                return '';
            }
        case "address":
            if(data.length > 30){
                return "dirección muy larga (mas de 30 caracteres)";
            }else{
                return '';
            }
        case 'date':
            if(dayjs(data).isValid()){
                return '';
            }else{
                return 'formato de fecha no valido';
            }
        default:
            return 'field not recongnized';
    }
}