import { calculateAge } from './UserFunction'
/* eslint-disable @typescript-eslint/no-inferrable-types */
export const isValidName=(name:string)=>{
    const reg:RegExp = /^([A-Z]+)([a-z]+)(\s)?$|^([a-z]+)(\s)?$|^([A-Z]+)(\s)?$/;
    if (!name.match(reg)) {
      return { state: false, error: 'Enter valid name!!!' }
    }
    return {state:true, error:''};
}

export const isValidId = (id:string,oldId:string,idList:string[])=>{
    const reg:RegExp = /^[1-9](\d+)$/;
    if(id===oldId){
        return { state: true, error: '' }
    }
    if(!id.match(reg) || idList.includes(id)) {
      return { state: false, error: 'Enter valid Id!!!' }
    }
    return {state:true, error:''};
}

export const isValidAddress = (address: string) => {
  const reg: RegExp = /^[a-zA-Z0-9\s,'-\\/]+$/
  if (!address.match(reg)) {
    return { state: false, error: 'Enter valid address!!!' }
  }
  return { state: true, error: '' }
}

export const isValidTPNO = (tpNo: string) => {
  const reg: RegExp = /^(0|\+94)(11|71|70|77|76|75|78)-?\d{7}$/
  if (!tpNo.match(reg)) {
    return { state: false, error: 'Enter valid mobile number!!!' }
  }
  return { state: true, error: '' }
}
export const isValidDateOfBirth = (dob: Date|null) => {
  if (!dob || calculateAge(dob)<18) {
    if(dob && calculateAge(dob)<0){
          return { state: false, error: 'Birthday can\'t be a feuture date!!!'}
    }
    return { state: false, error: 'Age should be greater than or equal 18!!!' }
  }
  return { state: true, error: '' }
}

export const isValidGender = (gender: string) => {
  if (
    !(
      gender === 'male' ||
      gender === 'female' ||
      gender === 'other' ||
      gender === 'Male' ||
      gender === 'Female' ||
      gender === 'Other'
    )
  ) {
    console.log(gender);
    return { state: false, error: 'Gender can only be male, female or other!!!' }
  }
  return { state: true, error: '' }
}







