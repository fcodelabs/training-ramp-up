import { MenuItem } from "@mui/material"
import { StyledTextFieldWrapper } from "../../../../../../Utilities/TableStyles"
import{ genders} from "../../../../../../Utilities/TableStyles"

const GenderEditCell:React.FC<{params:any}> = ({ params }) => {

    return (
        <StyledTextFieldWrapper
            error={false}
            select
            fullWidth
            value={params.value || 'Male'}
            onChange={(e) => params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })}
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