import { StyledTextFieldWrapper } from "../../../../../../Utilities/TableStyles"
import { validateName } from "../../../../../../Utilities/ValidateUser"
import { useAppDispatch } from "../../../../../../Redux/hooks"
import { saveUser, updateName } from "../../../../../../Redux/user/userSlice"

const NameHeader = () => {
    return (
        <div style={{ paddingRight: '50px' }}>
            Name
        </div>
    )
}

const NameEditCell:React.FC<{params: any}> =({ params }) => {
        const dispatch = useAppDispatch();
        const error = !validateName(params.value)
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const update={
                uid: params.id,
                name: e.target.value,
            }
            params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })
            dispatch(updateName(update))
        }

        return (
            <StyledTextFieldWrapper
                error={error}
                fullWidth
                type="text"
                value={params.value || ''}
                onChange={(e: any) =>  handleChange(e)}
                helperText={error && "This field is required"}
            />

        );
    }


export { NameHeader, NameEditCell }