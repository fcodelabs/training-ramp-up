export interface Payload{
    name:string,
    sub:number,
    role:string
}

export enum Role {
    User = 'User',
    Admin = 'Admin',
}