import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const validateMobile = (value: string) =>{
    const regex = new RegExp(/^[0-9]+$/);
    if (value !== '' && regex.test(value) && value.length === 10) {
        return true;
    } else {   
        toast.error('Enter Valid Mobile Number', {
            position: toast.POSITION.TOP_RIGHT
        });
        return false;
    }
}

export const validateName = (value: string) =>{
    const regex = new RegExp(/^[a-zA-Z\s]*$/);
    if (value !== undefined && value !== '' && regex.test(value) ) {
        return true;
    } else {   
        toast.error('Enter Valid Name', {
            position: toast.POSITION.TOP_RIGHT
        });
        return false;
    }
}

export const validateAddress = (value: string) =>{
    if (value !== undefined && value !== '' ){
        return true;
    } else {
        toast.error('Enter Valid Address', {
            position: toast.POSITION.TOP_RIGHT
        });
        return false;
    }
}

export const validateDate = (value: string) =>{
    if (value !== undefined && value !== '' ){
        return true;
    } else {
        toast.error('Enter Date of Birth', {
            position: toast.POSITION.TOP_RIGHT
        });
        return false;
    }
}