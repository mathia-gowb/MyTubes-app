
export function testForErrors(value,errorMessage,inputType,required){
    /* checks whether inputed values matches expected format for input type and return a boolean */
    const regExps={
        email:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        //password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
        password:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
        userName:/^[A-Za-z0-9 ]+$/
    }

    if(required && value.trim().length===0){
        //if value required and string length exluding white space strings
        return 'input is required'
    }else if( !value.match(regExps[inputType])){
        //if input does not match string return the error message
        return errorMessage
    }else{
        return "";
    }
}