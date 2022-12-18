export let validationStatus = '';
import { StudentModel } from './interfaces';
function checkValidation(dataItem: StudentModel) {
  const nameRegEx = /^[A-z ]{5,20}$/;
  const addressRegEx = /^[A-z ]{5,20}$/;
  const mobileRegEx = /^[0-9]{5,11}$/;

  let fieldStatus = false;
  if (dataItem.name !== undefined && nameRegEx.test(dataItem.name)) {
    fieldStatus = true;
  } else {
    fieldStatus = false;
    validationStatus = 'check name field....!';
    console.log('check name field....!');
    return;
  }

  if (dataItem.address !== undefined && addressRegEx.test(dataItem.address)) {
    fieldStatus = true;
  } else {
    fieldStatus = false;
    validationStatus = 'check address field....!';
    console.log('check address field....!');
    return;
  }

  if (
    (dataItem.gender !== undefined && dataItem.gender == 'Male') ||
    dataItem.gender == 'Female'
  ) {
    fieldStatus = true;
  } else {
    fieldStatus = false;
    validationStatus = 'check gender field....!';
    console.log('check gender field....!');
    return;
  }

  if (dataItem.mobileNo !== undefined && mobileRegEx.test(dataItem.mobileNo)) {
    fieldStatus = true;
  } else {
    fieldStatus = false;
    validationStatus = 'check mobileNo field....!';
    console.log('check mobileNo field....!');
    return;
  }

  if (dataItem.birth !== undefined) {
    fieldStatus = true;
  } else {
    fieldStatus = false;
    validationStatus = 'check birth day field....!';
    console.log('check birth day field....!');
    return;
  }

  return fieldStatus;
}
