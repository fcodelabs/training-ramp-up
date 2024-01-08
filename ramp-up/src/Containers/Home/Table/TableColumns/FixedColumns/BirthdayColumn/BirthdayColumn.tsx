import { StyledTextFieldWrapper } from "../../../../../../Utilities/TableStyles"
import { validateBirthday } from "../../../../../../Utilities/ValidateUser"
import calculateAge from "../../../../../../Utilities/calculateAge"
import { useAppDispatch } from "../../../../../../Redux/hooks";
import { updateBirthday, updateAge } from "../../../../../../Redux/user/userSlice";



const BirthdayHeader = (props: any) => {
    return (<div style={{ paddingRight: '25px' }}>
        Date of Birth
    </div>)
}

const BirthdayCell: React.FC<{ params: any }> = ({ params }) => {
    
    const dateObject = params.value ? new Date(params.value) : null;

    const formattedDate = dateObject
       ?`${dateObject.toLocaleDateString('en-US', { weekday: 'short' })}
         ${dateObject.toLocaleDateString('en-US', { month: 'short' })} 
         ${dateObject.toLocaleDateString('en-US', { day: 'numeric' })} 
         ${dateObject.toLocaleDateString('en-US', { year: 'numeric' })}`
        : '';

    return (
        <div>
            {formattedDate}
        </div>
    );

}

const BirthdayEditCell: React.FC<{ params: any }> = ({ params }) => {
    const dispatch = useAppDispatch();
    const error = !validateBirthday(params.value)
    const dateObject = params.value ? new Date(params.value) : null;
    const handleDateChange = (newDate: string) => {
        const newDateObject = newDate ? new Date(newDate) : null;
        params.api.setEditCellValue({ id: params.id, field: params.field, value: newDateObject });
        const age = calculateAge(newDateObject!);
        params.api.setEditCellValue({ id: params.id, field: 'age', value: age });
        const Birthday = {
            uid: params.id,
            birthday: newDateObject!,
        }
        const Age = {
            uid: params.id,
            age: Number(age),
        }
        dispatch(updateBirthday(Birthday))
        dispatch(updateAge(Age))

    };

    return (
        <StyledTextFieldWrapper
            error={error}
            fullWidth
            type="date"
            value={dateObject ? dateObject.toISOString().slice(0, 10) : ''}
            onChange={(e) => handleDateChange(e.target.value)}
            helperText={error && "This field is required"}
        />
    );
}

export { BirthdayHeader, BirthdayEditCell, BirthdayCell }