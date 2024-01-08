import { StyledFormHelperText, StyledPhoneInput, StyledPhoneInputWrapper } from "../../../../../../Utilities/TableStyles";
import { validateMobile } from "../../../../../../Utilities/ValidateUser";
import { useAppDispatch } from "../../../../../../Redux/hooks";
import { updateMobile } from "../../../../../../Redux/user/userSlice";



const MobileEditCell: React.FC<{params:any}> = ({params})=>{
    const error = !validateMobile(params.value);
    const dispatch = useAppDispatch();
    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const update = {
            uid: params.id,
            mobile: String(e),
        }
        params.api.setEditCellValue({ id: params.id, field: params.field, value: e })
        dispatch(updateMobile(update))
    }

    return (
        <StyledPhoneInputWrapper>
            <StyledPhoneInput
                error={error}
                placeholder="+"
                value={params.value || ''}
                maxLength={16}
                onChange={(e: any) => handleMobileChange(e)}
            >
            </StyledPhoneInput>
            {error && <StyledFormHelperText >This field is required</StyledFormHelperText>}
        </StyledPhoneInputWrapper>
    );
}

export default MobileEditCell