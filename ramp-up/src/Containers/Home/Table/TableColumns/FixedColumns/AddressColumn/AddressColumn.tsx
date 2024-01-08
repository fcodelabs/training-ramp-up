import { StyledTextFieldWrapper } from "../../../../../../Utilities/TableStyles";
import { validateAddress } from "../../../../../../Utilities/ValidateUser";
import { useAppDispatch } from "../../../../../../Redux/hooks";
import { updateAddress } from "../../../../../../Redux/user/userSlice";


const AddressEditCell: React.FC<{params:any}> = ({ params }) => {
    const error = !validateAddress(params.value)
    const dispatch = useAppDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const update={
            uid: params.id,
            address: e.target.value,
        }
        params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })
        dispatch(updateAddress(update))
    }
    return  (
        <StyledTextFieldWrapper
            type="text"
            error={error}
            value={params.value || ''}
            onChange={(e:any) => handleChange(e)}
            helperText={error && "This field is required"}
        >

        </StyledTextFieldWrapper>
    );

}

export default AddressEditCell