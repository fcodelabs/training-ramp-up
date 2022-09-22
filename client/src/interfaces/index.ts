export * from './student.input.validators';
export * from './user.input.validators';













export interface Student {
        id?:number,name:string,gender:string,address:string,mobileNo:number,dob:string|Date,age:number,inEdit?:boolean,email?:string,password?:string
}

export interface User {
        sessionId:string,name:string,role:string,email:string
}

