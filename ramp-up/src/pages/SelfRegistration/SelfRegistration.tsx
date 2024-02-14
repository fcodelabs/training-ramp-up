import React from "react";
import { Card, 
         Box, 
         FormControl, 
         InputLabel, 
         InputAdornment, 
         IconButton,
         OutlinedInput,
         FormHelperText,
         TextField,
        } from "@mui/material";
import { StyledButton } from "../home/AddUser/AddUser";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { validatePassword } from "../../utility";
import { selfRegisterRequest } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { isValidEmail } from "../../utility";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../SocketContext";
import ErrorModal from "../../components/ErrorModal/ErrorModal";

const styles = {
    box:{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
    },
    cardTitle:{
        padding: "16px 16px 16px 24px", 
        lineHeight: "32px",
        fontWeight: 400,
        fontSize: "24px",
        fontFamily: "Roboto,sans-serif",
    },
    cardDiv:{
        display: "flex",
        flexDirection: "column" as "column",
        gap: "16px",
        padding: "16px",
    },

    inputProps:{
        width: "520px",
        maxWidth: "100%",
        paddingLeft: "8px",
        '& .MuiInputLabel-root': {
            marginLeft: '8px',
          },
          '& .MuiInputBase-input': {
            marginLeft: '8px',
          },
    },
    loginText:{
        fontFamily: "Roboto,sans-serif",
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: "24px",
        LetterSpacing: "0.15px",
        display: "flex",
        justifyContent: "center",
    },
    loginLink:{
        color: "#2196F3",
        textDecoration: "none",
        fontFamily: "Roboto,sans-serif",
        fontSize: "16px",
        fontWeight: 600,
        lineHeight: "24px",
        LetterSpacing: "0.15px",
        paddingLeft: "4px",

    }
}

export function SelfRegistration() {

    const navigate = useNavigate();
    const dispatch = useDispatch();  

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [isSubmit, setIsSubmit] = React.useState(false);
    const [emailExists, setEmailExists] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    
    const socket = React.useContext(SocketContext);


    socket.on("user-exists", (data: boolean) => {
         if (data) {
            setEmailExists(true);
         } else {
            setEmailExists(false);
            setOpenDialog(true);
         }
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };

    const onclose = () => {
        setOpenDialog(false);
        navigate("/");
    }

    const handleSubmit = () => {
        setIsSubmit(true);
        if(validatePassword(password) && password === confirmPassword && name !== "" && isValidEmail(email) && !emailExists){
            try{
              const data =  {name: name, email: email, password: password}
              console.log(data);
              dispatch(selfRegisterRequest(data))
              setIsSubmit(false);
              setPassword("");
              setConfirmPassword("");
              setName("");
              setEmail("");
            } catch (error) {
              console.log(error);
            }
        }
      }

    return(
        <Box sx={styles.box}>

        <ErrorModal 
            open={openDialog}
            onClose={onclose}
            message="Your account has been successfully created."
            dismiss ={false}
            buttonName="OK"
            onClick={onclose}
            />

        <Card
            sx={{
                boxShadow: "none",
            }}
        >
            <div style={styles.cardTitle}>
            Register
            </div>
            <div style={styles.cardDiv}>

            <TextField
                error={name === '' && isSubmit}
                helperText={name === '' && isSubmit ? 'Mandatory fields missing' : ''}
                sx={styles.inputProps}
                label="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <TextField
                error = {email === '' && isSubmit || !isValidEmail(email) && isSubmit || emailExists}
                helperText={email === '' && isSubmit ? 'Mandatory fields missing' : (!isValidEmail(email) && isSubmit ? 'Invalid email address' : emailExists ? 'Email already exists' : '')}
                sx={styles.inputProps}
                label="Email"
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value)
                    setEmailExists(false)
                    }
                }
            />
            <FormControl 
                sx={{ m: 1, width: '520px', maxWidth: "100%" }} 
                variant="outlined"
                error={password.length > 0 && !validatePassword(password) || isSubmit && password ===""}
                >
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    >
                    {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon/>}
                    </IconButton>
                </InputAdornment>
                }
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            {
                password.length > 0 && !validatePassword(password) &&<FormHelperText >
                weak password
                </FormHelperText>
            }
            {
                isSubmit && password ==="" && <FormHelperText>Mandatory field missing</FormHelperText>
            }
            
            </FormControl>
        <FormControl 
            sx={{ m: 1, width: '520px', maxWidth: "100%" }} 
            variant="outlined"
            error={password !== confirmPassword && confirmPassword !== "" || isSubmit && confirmPassword ===""}
            >
          <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showConfirmPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                </IconButton>
              </InputAdornment>
            }
            label="confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
         {(password !== confirmPassword && confirmPassword !== "") && <FormHelperText>please make sure your passwords match</FormHelperText>}
         {isSubmit && confirmPassword ==="" && <FormHelperText>Mandatory field missing</FormHelperText>}

        </FormControl>

        <StyledButton
            sx={{ 
                width: "520px", 
                maxWidth: "100%",
                marginLeft: "8px",}}
            onClick={handleSubmit}
        >
            Submit
        </StyledButton>
        <div style={styles.loginText}>
            <span>Already have an account? </span>
            <a 
            style={styles.loginLink}
            href="/">Login</a>
        </div>
            </div>
        </Card>
        </Box>
    )
}