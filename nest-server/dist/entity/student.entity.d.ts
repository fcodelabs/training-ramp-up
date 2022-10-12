import { BaseEntity } from 'typeorm';
export declare class Student extends BaseEntity {
    id: number;
    name: string;
    gender: string;
    address: string;
    mobile_number: string;
    age: number;
    date: string;
}
