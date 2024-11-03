const bcrypt = require('bcrypt') 
import { error } from 'console';
const saltRounds= 10;

export const hashPasswordHelper = async(plainPassWord: string) =>{
    try{
        return await bcrypt.hash(plainPassWord,saltRounds);
    }catch(error){
        console.log(error);
        
    }
}
export const comparePasswordHelper = async(plainPassWord: string, hashPassword: string) =>{
    try{
        return await bcrypt.compare(plainPassWord,hashPassword);
    }catch(error){
        console.log(error);
        
    }
}