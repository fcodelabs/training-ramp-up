import { Typography } from "@mui/material";
import { StyledTextFieldWrapper } from "../../../../../../Utilities/TableStyles";
import { validateAge } from "../../../../../../Utilities/ValidateUser";

const Age = () => {
    return (
        <div style={{ paddingRight: '50px' }}>
            Age
        </div>
    )
}

const AgeEditCell: React.FC<{ params: any }> = ({ params }) => {
    const error = !validateAge(params.value)
    return (
        <StyledTextFieldWrapper
            error={error}
            fullWidth
            type="number"
            value={params.value || ''}
            onChange={(e) => params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })}
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