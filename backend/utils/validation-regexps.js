const regExps={
    email:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    //password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
    password:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
    userName:/^[A-Za-z0-9 ]+$/
}
module.exports = regExps;