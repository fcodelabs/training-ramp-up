import { Typography } from "@mui/material";
import { StyledTextFieldWrapper } from "../../../../../../Utilities/TableStyles";
import { validateAge } from "../../../../../../Utilities/ValidateUser";
import { useAppDispatch } from "../../../../../../Redux/hooks";
import { updateAge } from "../../../../../../Redux/user/userSlice";


const Age = () => {
    return (
        <div style={{ paddingRight: '50px' }}>
            Age
        </div>
    )
}

const AgeEditCell: React.FC<{ params: any }> = ({ params }) => {
    const dispatch = useAppDispatch();
    const error = !validateAge(params.value)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const update = {
            uid: params.id,
            age: Number(e.target.value),
        }
        params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })
        dispatch(updateAge(update))
    }

    return (
        <StyledTextFieldWrapper
            error={error}
            fullWidth
            type="number"
            value={params.value || ''}
            onChange={(e:any) => handleChange(e) }
            helperText={error && (
                <Typography variant="body2" color="error" fontSize={6.5} lineHeight={1}>
                    Individual is below the
                    <br />
                    minimum age allowed
                </Typography>
            )}
        />
    );
}

export { Age, AgeEditCell }