export const inputValidate= (elem,data) => {
    switch(elem.name){
        case 'name':
            if(data.length > 20){
                return "Nombre incorrecto (tiene mas de 20 caracteres)";
            }else{
                return "";
            }
        case 'first_surname':
        case 'apellido1':
            if(data.length > 20){
                return "Apellido incorrecto (tiene mas de 20 caracteres)";
            }else{
                return "";
            }
        case "email":
        const emailregex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
            if(emailregex.test(data)){
                return ""
            }else{
                return "Email incorrecto"
            }
        case "password":
            if(data.length < 2){
                return "Password tiene que tener al menos 8 caracteres";
            }else{
                return "";
            }
        default:
            return 'field not recongnized';
    }
}