import bcrypt from 'bcrypt';

export const generateSalt = async () =>{
    return await bcrypt.genSalt(10);
}

export const generateHashPassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
}

export const validatePassword = async (password: string, hashPassword: string, salt: string) => {
    
    const hash = await generateHashPassword(password, salt);
    return hash === hashPassword;
}