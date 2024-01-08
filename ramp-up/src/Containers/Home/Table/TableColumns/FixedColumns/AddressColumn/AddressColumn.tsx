import { StyledTextFieldWrapper } from "../../../../../../Utilities/TableStyles";
import { validateAddress } from "../../../../../../Utilities/ValidateUser";



const AddressEditCell: React.FC<{params:any}> = ({ params }) => {
    const error = !validateAddress(params.value)
    return  (
        <StyledTextFieldWrapper
            type="text"
            error={error}
            value={params.value || ''}
            onChange={(e) => params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })}
            helperText={error && "This field is required"}
        >

        </StyledTextFieldWrapper>
    );

}

export default AddressEditCell