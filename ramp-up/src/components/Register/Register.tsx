import { VisibilityOff, Visibility } from '@mui/icons-material'
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
  Button,
  Typography,
} from '@mui/material'
import React from 'react'

export default function Register() {
    const [showPassword, setShowPassword] = React.useState(false);

   const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
 

  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
      <TextField id="name" label="Name" multiline maxRows={4} />
      <TextField id="email" label="Email" multiline maxRows={4} />

      <InputLabel>Password</InputLabel>
      <OutlinedInput
        id="password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
               onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
<InputLabel>Confirm Password</InputLabel>
      <OutlinedInput
        id="confirm-password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
               onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Confirm Password"
      />


      <Button size="small" variant='contained'>SUMBIT</Button>
      <Typography variant="body2">
          Already have an account? Login
          </Typography>
    </FormControl>
  )
}
