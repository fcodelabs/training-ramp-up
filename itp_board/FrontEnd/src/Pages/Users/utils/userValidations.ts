import { calculateAge } from './UserFunction'
/* eslint-disable @typescript-eslint/no-inferrable-types */

const stringValidation = (reg:RegExp,data:string,type:string) =>{
    if (!data.match(reg)) {
      return { state: false, error: `Enter valid ${type}!!!`}
    }
    return { state: true, error: '' }
}

export const isValidName = (name: string) => {
  const reg: RegExp = /^([A-Z]+)([a-z]+)(\s)?$|^([a-z]+)(\s)?$|^([A-Z]+)(\s)?$/
  return stringValidation(reg,name,'name');
}

export const isValidAddress = (address: string) => {
  const reg: RegExp = /^[a-zA-Z0-9\s,'-\\/]+$/
  return stringValidation(reg,address,'address');
}

export const isValidTPNO = (tpNo: string) => {
  const reg: RegExp = /^(0|\+94)(11|71|70|77|76|75|78)-?\d{7}$/
  return stringValidation(reg,tpNo,'mobile number');
}

export const isValidDateOfBirth = (dob: Date | null) => {
  if (!dob || calculateAge(dob) < 18) {
    if (dob && calculateAge(dob) < 0) {
      return { state: false, error: 'Birthday can\'t be a feuture date!!!' }
    }
    return { state: false, error: 'Age should be greater than or equal 18!!!' }
  }
  return { state: true, error: '' }
}