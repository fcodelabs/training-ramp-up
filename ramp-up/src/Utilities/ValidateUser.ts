import { GridRowModel } from "@mui/x-data-grid";

const validateUser = (user: GridRowModel, requiredFields: string[]) => {
    console.log(requiredFields)
    for (const field of requiredFields) {
        const fieldValue = user[field as keyof GridRowModel];
        if (fieldValue === '' || fieldValue === null) {
            return false;
        }
        console.log(fieldValue, field)
    }
    return true
};

const validateName = (name: string) => {
    if (name.length < 3) {
        return false;
    }
    return true;
}





export default validateUser;