export interface Student {
    ID?: number;
    Name: string;
    Gender: string;
    Address: string;
    MobileNo: string;
    DateOfBirth: Date;
    Age: number;
    inEdit?: boolean;

}

export interface columnInterface {
    title?: string,
    field?: string,
    show?: boolean,
    filter?: "boolean" | "numeric" | "text" | "date" | undefined,
    minWidth?: number,
    minGridWidth?: number,
    locked?: boolean,
    width?: string | number
}

