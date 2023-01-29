import { calculateAge } from './studentFunctions'
/* eslint-disable @typescript-eslint/no-inferrable-types */

const stringValidation = (reg:RegExp,data:string,type:string,customError:string='') =>{
    if (!data.match(reg)) {
      if(customError===''){
      return { state: false, error: `Enter valid ${type}!!!`};
      }
      return {state: false, error:customError};
    }
    return { state: true, error: '' }
}

export const isValidName = (name: string) => {
  // const reg: RegExp = /^([A-Z]+)([a-z]+)(\s)?$|^([a-z]+)(\s)?$|^([A-Z]+)(\s)?$/
  const reg: RegExp = /^[A-Z][a-z]+((\s[A-Z][a-z]*)*)$|^[a-z]+((\s[A-Z][a-z]*)*)$|^[a-z]+((\s[a-z]*)*)$|^[A-Z][a-z]+((\s[a-z]*)*)$/
  return stringValidation(reg,name,'name');
}

export const isValidAddress = (address: string) => {
  const reg: RegExp = /^[a-zA-Z0-9\s,'-\\/]+$/;
  return stringValidation(reg,address,'address');
}

export const isValidTPNO = (tpNo: string) => {
  const reg: RegExp = /^(0|\+94)(11|71|70|77|76|75|78)-?\d{7}$/;
  return stringValidation(reg,tpNo,'mobile number');
}

export const isValidEmail = (email:string)=>{
  const reg:RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return stringValidation(reg,email,'email');
}

export const isValidPassword = (password:string)=>{
  const reg:RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const customError = `Password requires at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and one special character`
  return stringValidation(reg,password,'password',customError);
}

export const isValidDateOfBirth = (dob: Date | null) => {
  if (!dob || calculateAge(dob) < 18) {
    if (dob && calculateAge(dob) < 0) {
      return { state: false, error: 'Birthday can\'t be a future date!!!' }
    }
    return { state: false, error: 'Age should be greater than or equal 18!!!' }
  }
  return { state: true, error: '' }
}