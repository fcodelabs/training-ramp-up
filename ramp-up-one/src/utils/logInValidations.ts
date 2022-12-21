// validations
// import { LoginDetails } from './interfaces';
export function checkLogInValidation(dataItem:any) {
  const email = /^[A-z2-9]+@[A-z2-9]+\.[A-z2-9]+$/;
  const name = /^[A-z]{2,20}$/;
  const password = /^[A-z,0-9 _]{4,10}$/;
  let fieldStatus: boolean = false;

  if (dataItem.email !== undefined && email.test(dataItem.email)) {
    fieldStatus = true;
  } else {
    fieldStatus = false;
    alert('check email field....!');
    return;
  }

  if (dataItem.name !== undefined && name.test(dataItem.name)) {
    fieldStatus = true;
  } else {
    fieldStatus = false;
    alert('check name field....!');
    return;
  }

  if (dataItem.password !== undefined && password.test(dataItem.password)) {
    fieldStatus = true;
  } else {
    fieldStatus = false;
    alert('check password field....!');
    return;
  }

  return fieldStatus;
}
