import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { StyledAddDialog } from "../StyledComponents/StyledComponents";
import {
  Box,
  Select,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { validateEmail } from "../../utility/index";
import AlertDialog from "../AlertDialog/AlertDialog";
import { addUser } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { registedEmailCheck } from "../../redux/slices/userSlice";
import { RootState } from "../../redux/store";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

export interface newUser {
  name: string;
  email: string;
  role: string;
}

export default function AddNewUserDialog() {
  const dispatch = useDispatch();
  const socket = io(`${process.env.REACT_APP_API_URL}/`, {});
  const [open, setOpen] = React.useState(false);
  const [nameIsEmpty, setNameIsEmpty] = React.useState(false);
  const [emailIsEmpty, setEmailIsEmpty] = React.useState(false);
  const [roleIsEmpty, setRoleIsEmpty] = React.useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = React.useState(false);
  const [isEmailRegistered, setIsEmailRegistered] = React.useState(false);
  const [isPasswordLinkSent, setIsPasswordLinkSent] = React.useState(false);
  const [isPasswordLinkFailed, setIsPasswordLinkFailed] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const registeredEmail = useSelector(
    (state: RootState) => state.user.registedEmail
  );

  useEffect(() => {
    socket.on("addUser", (message) => {
      if (message === 201) {
        setIsPasswordLinkSent(true);
      } else {
        setIsPasswordLinkFailed(true);
      }
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setNameIsEmpty(false);
    setEmailIsEmpty(false);
    setRoleIsEmpty(false);
    setIsEmailInvalid(false);
    setIsEmailRegistered(false);
    setName("");
    setEmail("");
    setRole("");
  };

  const HandleSubmit = () => {
    setNameIsEmpty(false);
    setEmailIsEmpty(false);
    setRoleIsEmpty(false);
    setIsEmailInvalid(false);
    setIsEmailRegistered(false);
    const invalidEmail = !validateEmail(email);
    dispatch(registedEmailCheck(email));

    if (name === "") {
      setNameIsEmpty(true);
    }
    if (email === "") {
      setEmailIsEmpty(true);
    } else if (invalidEmail) {
      setIsEmailInvalid(true);
    } else if (registeredEmail) {
      setIsEmailRegistered(true);
    }
    if (role === "") {
      setRoleIsEmpty(true);
    }
    if (
      name === "" ||
      email === "" ||
      role === "" ||
      invalidEmail ||
      registeredEmail
    ) {
      return;
    } else {
      try {
        const newUser: newUser = { name, email, role };
        dispatch(addUser(newUser));
        handleClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        ADD NEW USER
      </Button>
      <StyledAddDialog onClose={handleClose} open={open}>
        <DialogTitle>Add a New User</DialogTitle>

        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              paddingTop: "5px",
            }}
          >
            <TextField
              size="medium"
              variant="outlined"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={nameIsEmpty}
              helperText={nameIsEmpty ? "Mandatory field is missing." : null}
            />
            <TextField
              size="medium"
              variant="outlined"
              label="Email"
              value={email}
              onChange={(e) => {setEmail(e.target.value);
              dispatch(registedEmailCheck(e.target.value));}}
              error={emailIsEmpty || isEmailInvalid || isEmailRegistered}
              helperText={
                emailIsEmpty
                  ? "Mandatory field is missing."
                  : isEmailInvalid
                  ? "Please enter a valid email address."
                  : isEmailRegistered
                  ? "The entered email has already been registered."
                  : null
              }
            />
          </Box>
          <FormControl size="medium" variant="outlined" fullWidth>
            <InputLabel error={roleIsEmpty} sx={{ marginTop: "16px" }}>
              Role
            </InputLabel>
            <Select
              sx={{
                marginTop: "16px",
                marginBottom: roleIsEmpty ? "0px" : "24px",
                color: "rgba(0, 0, 0, 0.87)",
              }}
              size="medium"
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              error={roleIsEmpty}
            >
              <MenuItem value={"Admin"}>Admin</MenuItem>
              <MenuItem value={"Observer"}>Observer</MenuItem>
            </Select>
            <FormHelperText
              error={roleIsEmpty}
              sx={{ marginBottom: roleIsEmpty ? "24px" : "0px" }}
            >
              {roleIsEmpty ? "Mandatory field is missing." : null}
            </FormHelperText>
          </FormControl>
          <Box sx={{ display: "flex", gap: "16px" }}>
            <Button variant="contained" onClick={HandleSubmit}>
              SUBMIT
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              cancle
            </Button>
          </Box>
        </DialogContent>
      </StyledAddDialog>

      <AlertDialog
        title="A password creation link has been sent to the provided email address."
        buttonText2="OK"
        isOpen={isPasswordLinkSent}
        handleClickSecondButton={() => setIsPasswordLinkSent(false)}
      />

      <AlertDialog
        title="Failed to send password creation link. Please try again later."
        buttonText2="TRY AGAIN"
        isOpen={isPasswordLinkFailed}
        handleClickSecondButton={() => setIsPasswordLinkFailed(false)}
      />
    </React.Fragment>
  );
}
