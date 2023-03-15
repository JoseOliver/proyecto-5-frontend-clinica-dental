export const inputValidate= (elem,data) => {
    switch(elem.name){
        case "email":
        break;
        case "password":
            if(data.length<8){
                return "Password tiene que tener al menos 8 caracteres";
            }else{
                return "";
            }
        break;
        default:
            return 'field not recongnized';
    }
}