export class Student {
    constructor(
        public id: string,
        public name: string,
        public gender: string,
        public address: string,
        public mobileNo: string,
        public dateOfBirth: Date,
        public age: number,
        public inEdit: boolean,
    ) { }
}