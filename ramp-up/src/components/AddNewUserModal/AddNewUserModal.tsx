import React from "react";
import { Box, Modal , TextField, Select, Button, MenuItem, FormControl, InputLabel, FormHelperText} from "@mui/material";
import { StyledButton } from "../../pages/home/AddUser/AddUser";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { isValidEmail } from "../../utility";
import { useDispatch } from "react-redux";
import { addUserRequest } from "../../redux/slices/userSlice";

const styles = {
    addNewText:{
        color: "var(--text-primary, rgba(0, 0, 0, 0.87))",
        fontFeatureSettings: "'clig' off, 'liga' off",
        
        /* typography/h5 */
        fontFamily: "Roboto",
        fontSize: "24px",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "133.4%",
        padding: "32px 24px 16px 24px"
    },
    modalDiv:{
        top: "50%",
        left: "50%",
        background: "#FFFFFF",
        position: "absolute" as "absolute",
        maxHeight: "100%",
        gap: "16px",
        flexShrink: 0,
        transform: "translate(-50%, -50%)",
        borderRadius: "4px"
    },
    boxDiv:{
        padding: "16px 24px 24px 24px",
        display: "flex",
        flexDirection: "column" as "column",
        alignItems: "flex-start",
        gap: "16px",
    },
    buttonDiv:{
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row" as "row",
        gap: "16px",
    },
    inputProps:{
        width: "560px",
        maxWidth: "100%",
    }

}

const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            width: "auto",
            fontSize: "13px",
            fontFamily: "Roboto,sans-serif",
            fontWeight: 500,
            lineHeight: "22px",
            letterSpacing: "0.46px",
            padding: "4px 10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "var(--borderRadius, 4px)",
          },
        },
      },
    },
  });


function AddNewUserModal({
    open,
    onClose
}) {

  const dispatch = useDispatch();

  const [role, setRole] = React.useState("")
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [isSubmit, setIsSubmit] = React.useState(false)

  const handleSubmit = () => {
    setIsSubmit(true)
    const user = {
        name: name,
        email: email,
        role: role
    }
    if(name !== '' && email !== '' && isValidEmail(email) && role !== ''){
        dispatch(addUserRequest(user))
        onClose()
        setIsSubmit(false)
    }
  }

  const handleCloseReset = () => {
    onClose();
    setIsSubmit(false)
  }

  return (
    <div>
        <Modal
        open={open}
        onClose={handleCloseReset}
        >
            <Box
            sx={styles.modalDiv}
            >
                <div style={styles.addNewText}>
                        Add a New User
                    </div>
                <div style={styles.boxDiv}>
                

                    <TextField
                        error={name === '' && isSubmit}
                        helperText={name === '' && isSubmit ? 'Mandatory fields missing' : ''}
                        sx={styles.inputProps}
                        placeholder="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <TextField
                        error = {email === '' && isSubmit || !isValidEmail(email) && isSubmit}
                        helperText={email === '' && isSubmit ? 'Mandatory fields missing' : (!isValidEmail(email) && isSubmit ? 'Invalid email address' : '')}
                        sx={styles.inputProps}
                        label="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                <FormControl 
                    fullWidth
                    error={role === '' && isSubmit}
                    >
                        <InputLabel 
                        >Role</InputLabel>
                    <Select
                        sx={styles.inputProps}
                        label="Role"
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                        >
                         <MenuItem value={"Admin"}>Admin</MenuItem>
                         <MenuItem value={"Observer"}>Observer</MenuItem>
                    </Select>
                    {role === '' && isSubmit && <FormHelperText>Mandatory field missing</FormHelperText>}
                    </FormControl>

                    <div style={styles.buttonDiv}>
                <StyledButton
                    onClick={handleSubmit}
                >
                    Submit
                </StyledButton>

                <ThemeProvider theme={theme}>
                  <Button
                    sx={{
                      width: "47px",
                    }}
                    variant="outlined"
                    onClick={handleCloseReset}
                  >
                    cancel
                  </Button>
                </ThemeProvider>
              </div>
              </div>

             
                

            </Box>
        </Modal>
    </div>
  )
}

export default AddNewUserModal;