
export function testForErrors(value,errorMessage,inputType,required){
    /* checks whether inputed values matches expected format for input type and return a boolean */
    const regExps={
        email:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        /* Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character: */
        password:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        userName:/[^\w|\s]/gm
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