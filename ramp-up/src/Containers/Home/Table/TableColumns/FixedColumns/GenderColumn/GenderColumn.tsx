import { MenuItem } from "@mui/material"
import { StyledTextFieldWrapper } from "../../../../../../Utilities/TableStyles"
import{ genders} from "../../../../../../Utilities/TableStyles"
import { useAppDispatch } from "../../../../../../Redux/hooks";
import { updateUser } from "../../../../../../Redux/user/userSlice";

const GenderEditCell:React.FC<{params:any}> = ({ params }) => {
    const dispatch = useAppDispatch();
    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const update = {
            uid: params.id,
            updates:{
            gender: e.target.value,}
        }
        params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })
        dispatch(updateUser(update))
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