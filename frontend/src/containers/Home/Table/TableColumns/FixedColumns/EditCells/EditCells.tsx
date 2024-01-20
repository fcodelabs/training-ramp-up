import React from "react";
import { useAppDispatch } from "../../../../../../redux/hooks";
import { updateUser } from "../../../../../../redux/user/userSlice";
import { MenuItem, TextField, Typography } from "@mui/material";
import { calculateAge } from "../../../../../../utilities/index";
import { GridRenderEditCellParams } from "@mui/x-data-grid";
import styled from "styled-components";

interface Props {
  error: boolean;
}

export const StyledTextFieldWrapper = styled(TextField)<Props>(({ error }) => ({
  variant: "standard",
  color: "black",
  borderRadius: 0,
  textAlign: "end",
  outline: "none",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: error ? "#BD0203" : "rgba(33, 150, 243, 0.7)",
      borderRadius: 0,
    },
  },

  "& .MuiInputBase-root.Mui-disabled": {
    "& > fieldset": {
      borderColor: error ? "#BD0203" : "rgba(33, 150, 243, 0.7)",
    },
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
    fontSize: 8,
  },
}));

const StyledMenuItem = styled(MenuItem)({
  justifyContent:"flex-end"
})

interface EditableCellProps {
  params: GridRenderEditCellParams;
  field: string;
  value: string | Date | number;
  validate: (value: string | Date | number) => boolean;
  options?: string[];
}

const EditableCell: React.FC<EditableCellProps> = ({
  params,
  field,
  value,
  validate,
  options,
}) => {
  const dispatch = useAppDispatch();
  const error = !validate(value);

  const handleChange = (newValue: string) => {
    const update = {
      id: Number(params.id),
      [field]: newValue,
    };

    params.api.setEditCellValue({
      id: params.id,
      field: params.field,
      value: newValue,
    });
    dispatch(updateUser(update));
  };

  const handleDateChange = (newDate: string) => {
    const newDateObject = newDate ? new Date(newDate) : new Date();
    params.api.setEditCellValue({
      id: params.id,
      field: params.field,
      value: newDateObject,
    });
    const age = calculateAge(newDateObject!);
    params.api.setEditCellValue({
      id: params.id,
      field: "age",
      value: Number(age) <= 0 ? 0 : age,
    });
    const updateAge = {
      id: Number(params.id),
      age: Number(age),
      birthday: newDateObject.toISOString().slice(0, 10),
    };
    dispatch(updateUser(updateAge));
  };

  if (field === "age") {
    return (
      <StyledTextFieldWrapper
        error={error}
        fullWidth
        disabled
        type="number"
        value={value || 0}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value)
        }
        helperText={
          error && (
            <Typography
              variant="body2"
              color="error"
              fontSize={8}
              lineHeight={1}
            >
              Individual is below the
              <br />
              minimum age allowed
            </Typography>
          )
        }
      />
    );
  }

  if (field === "mobile") {
    return (
      <StyledTextFieldWrapper
        error={error}
        fullWidth
        type="string"
        placeholder=""
        value={value || ""}
        onChange={(e) => handleChange(e.target.value)}
        helperText={error && "please enter a valid phone number"}
      ></StyledTextFieldWrapper>
    );
  }

  if (field === "birthday") {
    const dateObject = params.value ? new Date(params.value) : new Date();
    const today = new Date().toISOString().slice(0, 10);

    return (
      <StyledTextFieldWrapper
        error={error}
        fullWidth
        type="date"
        value={dateObject ? dateObject.toISOString().slice(0, 10) : ""}
        onChange={(e) => handleDateChange(e.target.value)}
        InputProps={{
          inputProps: {
            max: today,
          },
        }}
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value)
        }
      >
        {options.map((option) => (
          <StyledMenuItem
            key={option}
            value={option}
            defaultValue={option[0]}
            style={{ justifyContent: "flex-end" }}
          >
            {option}
          </StyledMenuItem>
        ))}
      </StyledTextFieldWrapper>
    );
  }

  return (
    <StyledTextFieldWrapper
      error={error}
      fullWidth
      type="text"
      value={value || ""}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handleChange(e.target.value)
      }
    />
  );
};

export default EditableCell;
