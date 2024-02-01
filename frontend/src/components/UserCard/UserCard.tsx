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
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addNewUser, updateNewUser } from "../../redux/user/slice";
import { Role } from "../../redux/user/slice";

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
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.newUser);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateNewUser({[event.target.name]: event.target.value }));
  }

  const onClickAdd = () => { 
    dispatch(addNewUser(user));
    console.log("clicked");

  }
  
  const isEmailValidated = isValidEmail(user.email);
  const isEmailTaken = user.isVerifiedUser;
  const isEmailOk = isEmailValidated && !isEmailTaken;

  const users = [
    { id: 1, value: Role.OBSERVER },
    { id: 2, value: Role.ADMIN },
  ];
  return (
    <div>
      <Backdrop open={open} />
      <StyledDialogContent open={open} onClose={onClose}>
        <DialogContent>
          <Typography fontSize={20}>{errorMessage}</Typography>
          <StyledTextField fullWidth label="Name" error= {!isValidName(user.name)} onChange={handleChange} value={user.name} name="name">
            Name
          </StyledTextField>
          <StyledTextField fullWidth label="Email" error={!isEmailOk} onChange={handleChange} value={user.email} name="email"helperText={isEmailTaken? "The entered email has already been registered. ": !isEmailValidated? "Please enter a valid email address. ":""}>
            Email
          </StyledTextField>
          <StyledTextField
            select
            label="Role"
            name="role"
            defaultValue={Role.OBSERVER}
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
            <Button variant="contained" style={{ marginRight: "10px" }} onClick={onClickAdd}>
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
