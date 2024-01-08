import { MenuItem } from "@mui/material"
import { StyledTextFieldWrapper } from "../../../../../../Utilities/TableStyles"
import{ genders} from "../../../../../../Utilities/TableStyles"
import { useAppDispatch } from "../../../../../../Redux/hooks";
import { updateGender } from "../../../../../../Redux/user/userSlice";



const GenderEditCell:React.FC<{params:any}> = ({ params }) => {
    const dispatch = useAppDispatch();
    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const update = {
            uid: params.id,
            gender: e.target.value,
        }
        params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })
        dispatch(updateGender(update))
    }

    return (
        <StyledTextFieldWrapper
            error={false}
            select
            fullWidth
            value={params.value || 'Male'}
            onChange={(e:any) => handleGenderChange(e)}
        >
            {genders.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </StyledTextFieldWrapper>
    )

}

export default GenderEditCell