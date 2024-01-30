import {
  Backdrop,
  Button,
  Dialog,
  DialogContent,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import styled from "styled-components";
import { isValidEmail, isValidName } from "../../utilities/validateUser";
type UserCardProps = {
  open: boolean;
  onClose: () => void;
};
const ButtonWrapper = styled.div`
  padding: 15px 0 0 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const StyledTextField = styled(TextField)`
  margin: 12px 0 10px 0 !important;
`;

const StyledDialogContent = styled(Dialog)`
  && {
    .MuiPaper-root.MuiDialog-paper {
      border-radius: 10px;
    }

  && {
    .MuiDialogContent-root {
        max-width: 500px;
      }}
`;

const UserCard: React.FC<UserCardProps> = ({ open, onClose }) => {
  const errorMessage = "Add a New User";
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("Observer");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const onClick = () => { 
    console.log("clicked");
  }
  
  const isEmailValidated = isValidEmail(email);
  const isEmailTaken = true;
  const isEmailOk = isEmailValidated && !isEmailTaken;

  const users = [
    { id: 1, value: "Observer" },
    { id: 2, value: "Admin" },
  ];
  return (
    <div>
      <Backdrop open={open} />
      <StyledDialogContent open={open} onClose={onClose}>
        <DialogContent>
          <Typography fontSize={20}>{errorMessage}</Typography>
          <StyledTextField fullWidth label="Name" error= {!isValidName(name)} onChange={handleChange} value={name}>
            Name
          </StyledTextField>
          <StyledTextField fullWidth label="Email" error={!isEmailOk} onChange={handleChange} value={email} helperText={isEmailTaken? "The entered email has already been registered. ": !isEmailValidated? "Please enter a valid email address. ":""}>
            Email
          </StyledTextField>
          <StyledTextField
            select
            label="Role"
            defaultValue="Observer"
            fullWidth
            onChange={handleChange}
          >
            {users.map((option) => (
              <MenuItem key={option.id} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </StyledTextField>{" "}
          <ButtonWrapper>
            <Button variant="contained" style={{ marginRight: "10px" }}>
              Submit
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
          </ButtonWrapper>
        </DialogContent>
      </StyledDialogContent>
    </div>
  );
};

export default UserCard;
