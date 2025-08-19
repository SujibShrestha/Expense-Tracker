export const validateEmail = (email) =>{
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
return emailRegex.test(email);
}