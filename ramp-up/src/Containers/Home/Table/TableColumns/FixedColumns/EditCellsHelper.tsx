import React from 'react';
import { MenuItem } from '@mui/material';
import { StyledTextFieldWrapper } from '../../../../../Utilities/TableStyles';
import { useAppDispatch } from '../../../../../Redux/hooks';
import { updateUser } from '../../../../../Redux/user/userSlice';

interface EditableCellProps {
  params: any;
  field: string;
  value: any;
  validate: (value: any) => boolean;
  options?: string[]; // For select inputs
}

const EditableCell: React.FC<EditableCellProps> = ({ params, field, value, validate, options }) => {
  const dispatch = useAppDispatch();
  const error = !validate(value);

  const handleChange = (newValue: any) => {
    const update = {
      uid: params.id,
      updates: {
        [field]: newValue,
      },
    };

    params.api.setEditCellValue({ id: params.id, field: params.field, value: newValue });
    dispatch(updateUser(update));
  };

  if (options) {
    // Select input
    return (
      <StyledTextFieldWrapper
        error={error}
        select
        fullWidth
        value={value || options[0]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </StyledTextFieldWrapper>
    );
  }

  // Text input
  return (
    <StyledTextFieldWrapper
      error={error}
      fullWidth
      type="text"
      value={value || ''}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
      helperText={error && 'This field is required'}
    />
  );
};

export default EditableCell;
