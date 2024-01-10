import React from 'react';
import { MenuItem } from '@mui/material';
import { StyledFormHelperText, StyledPhoneInput, StyledPhoneInputWrapper, StyledTextFieldWrapper } from '../../../../../../Utilities/TableStyles';
import { useAppDispatch } from '../../../../../../Redux/hooks';
import { updateUser } from '../../../../../../Redux/user/userSlice';
import { Typography } from '@mui/material';
import calculateAge from '../../../../../../Utilities/calculateAge';
import formatDate from '../../../../../../Utilities/formatDate';

interface EditableCellProps {
  params: any;
  field: string;
  value: any;
  validate: (value: any) => boolean;
  options?: string[];
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

  const handleDateChange = (newDate: string) => {
    const newDateObject = newDate ? new Date(newDate) : new Date();
    params.api.setEditCellValue({ id: params.id, field: params.field, value: newDateObject });
    const age = calculateAge(newDateObject!);
    params.api.setEditCellValue({ id: params.id, field: 'age', value: (Number(age)<=0)? 0: age });
    const updateAge = {
      uid: params.id,
      updates: {
        age: Number(age),
        Birthday: newDateObject!
      }
    }
    dispatch(updateUser(updateAge))
  };

  if (field === "age") {
    return (
      <StyledTextFieldWrapper
        error={error}
        fullWidth
        type="number"
        value={value || 0}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
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

  if (field === 'mobile') {
    return (

      <StyledTextFieldWrapper
          error={error}
          fullWidth
          type="string"
          placeholder=""
          value={value || ''}
          onChange={(e: any) => handleChange(e.target.value)}
        >
        {error && <StyledFormHelperText >This field is required</StyledFormHelperText>}
      </StyledTextFieldWrapper>
    );
  }

  if (field === 'birthday') {
    const dateObject = params.value ? new Date(params.value) : new Date();
    console.log(dateObject) 
    return (
      <StyledTextFieldWrapper
        error={error}
        fullWidth
        type="date"
        value={dateObject ? dateObject.toISOString().slice(0, 10) : ''}
        onChange={(e) => handleDateChange(e.target.value)}
        helperText={error && "This field is required"}
      />
    );
  }

  if (options) {
    return (
      <StyledTextFieldWrapper
        error={error}
        select
        fullWidth
        defaultValue={options[0]}
        value={value || options[0]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option} defaultValue={option[0]}>
            {option}
          </MenuItem>
        ))}
      </StyledTextFieldWrapper>
    );
  }

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
