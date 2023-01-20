export interface Student {
    ID: number,
    Name: string,
    Gender: string,
    Address: string,
    MobileNo: string,
    DateofBirth: Date,
    Age: number,
    inEdit?: boolean | string,
}

export interface MyCommandCellProps {  
    editField: string;
    dataItem: any;
    add: (dataItem: Student) => void;
    update: (dataItem: Student) => void;
    remove: (dataItem: Student) => void;
    discard: (dataItem: Student) => void;
    cancel: (dataItem: Student) => void;
    edit: (dataItem: Student) => void;
}
