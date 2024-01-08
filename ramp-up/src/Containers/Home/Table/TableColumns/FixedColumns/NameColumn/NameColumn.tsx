import { StyledTextFieldWrapper } from "../../../../../../Utilities/TableStyles"
import { validateName } from "../../../../../../Utilities/ValidateUser"

const NameHeader = () => {
    return (
        <div style={{ paddingRight: '50px' }}>
            Name
        </div>
    )
}

const NameEditCell:React.FC<{params: any}> =({ params }) => {
        const error = !validateName(params.value)
        return (
            <StyledTextFieldWrapper
                error={error}
                fullWidth
                type="text"
                value={params.value || ''}
                onChange={(e) => params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })}
                helperText={error && "This field is required"}
            />

        );
    }


export { NameHeader, NameEditCell }