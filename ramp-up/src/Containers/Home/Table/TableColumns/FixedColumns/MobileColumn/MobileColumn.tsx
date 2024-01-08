import { StyledFormHelperText, StyledPhoneInput, StyledPhoneInputWrapper } from "../../../../../../Utilities/TableStyles";
import { validateMobile } from "../../../../../../Utilities/ValidateUser";

const MobileEditCell: React.FC<{params:any}> = ({params})=>{
    const error = !validateMobile(params.value);

    return (
        <StyledPhoneInputWrapper>
            <StyledPhoneInput
                error={error}
                placeholder="+"
                value={params.value || ''}
                maxLength={16}
                onChange={(value: any) => {
                    params.api.setEditCellValue({ id: params.id, field: params.field, value: value });
                }}
            >
            </StyledPhoneInput>
            {error && <StyledFormHelperText >This field is required</StyledFormHelperText>}
        </StyledPhoneInputWrapper>
    );
}

export default MobileEditCell