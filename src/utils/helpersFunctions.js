// validamos los datos 
const regexEmail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regexPassword = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;

function ValidateEmail(Candidateemail){
    return regexEmail.test(Candidateemail)
};
function ValidatePassword(Candidatepassword){
    return regexPassword.test(Candidatepassword)
};

module.exports={ValidateEmail, ValidatePassword}