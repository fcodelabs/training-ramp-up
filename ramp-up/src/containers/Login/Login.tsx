import { Card, CardContent, Typography, CardActions, Button, CardActionArea, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Login() {
  const [password, setPassword] = useState('')

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  return (
    <div
      style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card sx={{ minWidth: 500 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Login
            </Typography>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="password">Email</InputLabel>
                <OutlinedInput
                  name="email"
                  id="email"
                  type="text"
                 
                 
                  label="Email"
                />
            
              </FormControl>

              <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="password">
                  Password
                </InputLabel>
                <OutlinedInput
                  name="password"
                  id="password"
                  onChange={handlePasswordChange}
                 //error={Boolean(passwordError)}
                  label="Password"
                />
                  {/* <FormHelperText>{passwordError}</FormHelperText> */}
              </FormControl>
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="medium"
            variant="contained"
            style={{ backgroundColor: '#2196F3', color: '#fff' }}
            fullWidth
           // onClick={handleSubmit}
          >
            LOGIN
          </Button>
          
        </CardActions>
        <Typography align="center" color="textSecondary">
              Don't have an account? <Link to="/register"  style={{ textDecoration: 'none',color:"#2196F3" }}>Register Now</Link>
            </Typography>

      </Card>
    </div>
   
  );
}