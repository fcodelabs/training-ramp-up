import React from "react";
import { Card, 
         Box, 
         FormControl, 
         InputLabel, 
         InputAdornment, 
         IconButton,
         OutlinedInput,
         FormHelperText,
        } from "@mui/material";
import { StyledButton } from "../home/AddUser/AddUser";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { validatePassword } from "../../utility";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import { useParams } from "react-router-dom";
import { addUserPasswordRequest } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
}

export function CreatePassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();  
    const { token } = useParams<{token: string}>();
    console.log(token);

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [isOpenErrorModal, setIsOpenErrorModal] = React.useState(false);
    

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };

    const handleCloseErrorModal = () => {
        setIsOpenErrorModal(false);
        navigate("/");
    }
    
    const handleSubmit = () => {
        if(validatePassword(password) && password === confirmPassword){
          if(token){
            try{
              dispatch(addUserPasswordRequest({token: token, password: password}));
              setPassword("");
              setConfirmPassword("");
              setIsOpenErrorModal(true);
            } catch (error) {
              console.log(error);
            }
          }
        }
      }

    return(
        <Box sx={styles.box}>
            <ErrorModal
                open={isOpenErrorModal}
                onClose={handleCloseErrorModal}
                message="Your account has been successfully created"
                dismiss={false}
                buttonName="OK"
                onClick={handleCloseErrorModal}
                />

        <Card
            sx={{
                boxShadow: "none",
            }}
        >
            <div style={styles.cardTitle}>
            Create your password
            </div>
            <div style={styles.cardDiv}>
            <FormControl 
                sx={{ m: 1, width: '520px', maxWidth: "100%" }} 
                variant="outlined"
                error={password.length > 0 && !validatePassword(password)}
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
                  {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon/>}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {
            password.length > 0 && !validatePassword(password) &&<FormHelperText >
            weak password
            </FormHelperText>
          }
          
        </FormControl>
        <FormControl 
            sx={{ m: 1, width: '520px', maxWidth: "100%" }} 
            variant="outlined"
            error={password !== confirmPassword && confirmPassword !== ""}
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
                  {showConfirmPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                </IconButton>
              </InputAdornment>
            }
            label="confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
         {(password !== confirmPassword && confirmPassword !== "") && <FormHelperText>please make sure your passwords match</FormHelperText>}

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
            </div>
        </Card>
        </Box>
    )
}