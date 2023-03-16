export const inputValidate= (elem,data) => {
    switch(elem.name){
        case 'name':
            if(data.length > 10){
                return "Nombre incorrecto (menos de 10 caracteres)";
            }else{
                return "";
            }
        case 'first_surname':
        case 'apellido1':
            if(data.length > 10){
                return "Apellido incorrecto (menos de 10 caracteres)";
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
            if(data.length < 8){
                return "Password tiene que tener al menos 8 caracteres";
            }else{
                return "";
            }
        default:
            return 'field not recongnized';
    }
}