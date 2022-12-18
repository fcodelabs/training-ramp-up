// validations
import { StudentModel } from './interfaces';
export function checkValidation(dataItem: StudentModel) {
  const nameRegEx = /^[A-z ]{5,20}$/;
  const addressRegEx = /^[A-z ]{5,20}$/;
  const mobileRegEx = /^[0-9]{5,10}$/;
  let fieldStatus: boolean = false;

  if (dataItem.name !== undefined && nameRegEx.test(dataItem.name)) {
    fieldStatus = true;
  } else {
    fieldStatus = false;
    alert('check name field....!');
    return;
  }

  if (dataItem.address !== undefined && addressRegEx.test(dataItem.address)) {
    fieldStatus = true;
  } else {
    fieldStatus = false;
    alert('check address field....!');
    return;
  }

  if (dataItem.gender !== undefined) {
    fieldStatus = true;
  } else {
    fieldStatus = false;
    alert('check gender field....!');
    return;
  }

  if (dataItem.mobileNo !== undefined && mobileRegEx.test(dataItem.mobileNo)) {
    fieldStatus = true;
  } else {
    fieldStatus = false;
    alert('check mobileNo field....!');
    return;
  }

  if (dataItem.birth !== undefined) {
    fieldStatus = true;
  } else {
    fieldStatus = false;
    alert('check birth field....!');
    return;
  }
  if (dataItem.age !== 0) {
    fieldStatus = true;
  } else {
    fieldStatus = false;
    alert('check birth day field,age needs to be more than 18 years....!');
    return;
  }
  return fieldStatus;
}
