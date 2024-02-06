import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
import styled from "@mui/system/styled";
import "@fontsource/roboto";
import Select from "@mui/material/Select";
// import Mailchecker from "mailchecker";
import { validateEmail } from "../../utility/emailValidator";
import { addUser } from "../../redux/user/slice";
import { useDispatch, useSelector } from "react-redux";

const StyledMenuBoxContainer = styled(Box)`
  &&& {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 632px;
    height: 405px;
    border-radius: 12px;
    box-shadow: 0px 11px 15px -7px #00000033, 0px 24px 38px 3px #00000024,
      0px 9px 46px 8px #0000001f;
  }
`;

const StyledMenuBox = styled(Box)`
  &&& {
    width: 584px;
    height: 363px;
  }
`;

const StyledTypographyBox = styled(Typography)`
  &&& {
    display: flex;
    width: 584px;
    height: 64px;
  }
`;

const StyledTypography = styled(Typography)`
  &&& {
    font-family: Roboto;
    font-weight: 400;
    font-size: 24px;
    line-height: 32.02px;
    color: #000000de;
    align-content: flex-start;
    padding: 16px 0px;
  }
`;

const StyledTextField = styled(TextField)`
  &&& {
    width: 584px;
    height: 56px;
    margin-bottom: 32px;
  }
`;

const StyledSelectField = styled(Select)`
  &&& {
    width: 584px;
    height: 56px;
    margin-bottom: 32px;
    align-content: flex-start;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  &&& {
    text-align: left;
  }
`;

const StyledButtonContainer = styled(Box)`
  &&& {
    display: flex;
    gap: 8px;
  }
`;

const StyledSubmitButton = styled(Button)`
  &&& {
    background-color: #2196f3;
    color: #ffffff;
    font-family: Roboto;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.4px;
  }
`;

const StyledEditButton = styled(Button)`
  &&& {
    border-color: #2196f3;
    color: #2196f3;
    font-family: Roboto;
    font-weight: 500;
    font-size: 13px;
    line-height: 22px;
    letter-spacing: 0.46px;
  }
`;

interface IUserCardProps {
  onSubmit: (name: string, email: string, role: string) => void;
  onCancel: () => void;
}

const AddNewUserCard: React.FC<IUserCardProps> = ({ onSubmit, onCancel }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Observer");
  const [nameMissing, setNameMissing] = useState(false);
  const [emailMissing, setEmailMissing] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);

    // Check if name is empty and set the error message
    setNameMissing(newName.trim() === "");
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    console.log("mail", newEmail);
    // Check if email is valid and set the error message
    setEmailMissing(newEmail.trim() === "");
  };

  const handleSubmit = () => {
    console.log("submit");
    if (name === "" || email === "") {
      setNameMissing(true);
      setEmailMissing(true);
    }
    if (validateEmail(email) === false) {
      console.log("email invalid");
      setEmailInvalid(true);
    }
    if (name !== "" && email !== "" && validateEmail(email) === true) {
      console.log("email valid");

      onSubmit(name, email, role);
      onCancel();
      dispatch(addUser({ name, email, role }));
    }
  };

  const handleCancel = () => {
    console.log("cancel");
    onCancel();
  };

  console.log(name, email, role);
  return (
    <StyledMenuBoxContainer>
      <StyledMenuBox>
        <StyledTypographyBox>
          <StyledTypography variant="h5">Add a New User</StyledTypography>
        </StyledTypographyBox>
        <StyledTextField
          label="Name"
          size="medium"
          value={name}
          onChange={handleNameChange}
          error={nameMissing}
          helperText={nameMissing ? "Mandatory fields missing." : ""}
        />
        <StyledTextField
          label="Email"
          placeholder=""
          value={email}
          onChange={handleEmailChange}
          error={emailMissing || emailInvalid}
          helperText={
            emailMissing
              ? "Mandatory fields missing."
              : emailInvalid
              ? "Invalid email address."
              : ""
          }
        />
        <FormControl>
          <InputLabel htmlFor="role-select">Role</InputLabel>
          <StyledSelectField
            label="Role"
            id="role-select"
            value={role}
            onChange={(event) => setRole(event.target.value as string)}
          >
            <StyledMenuItem value="Observer">Observer</StyledMenuItem>
            <StyledMenuItem value="Admin">Admin</StyledMenuItem>
          </StyledSelectField>
        </FormControl>
        <StyledButtonContainer>
          <StyledSubmitButton
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            SUBMIT
          </StyledSubmitButton>
          <StyledEditButton
            variant="outlined"
            color="primary"
            onClick={handleCancel}
          >
            CANCEL
          </StyledEditButton>
        </StyledButtonContainer>
      </StyledMenuBox>
    </StyledMenuBoxContainer>
  );
};

export default AddNewUserCard;
