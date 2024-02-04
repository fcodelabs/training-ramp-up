import { Card, CardActionArea, CardContent, Typography, CardActions, Button, TextField, Link, InputLabel } from '@mui/material';


export default function Login() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
         <CardContent>
        
          <Typography gutterBottom variant="h5" component="div">
            Login
          </Typography>
          <div style={{ marginBottom: '20px' }}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            style={{ width: '500px' }}
            
          />
        </div>
          <div style={{ marginBottom: '20px' }}>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            style={{ width: '500px' }}
            />
                 {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
          <InputLabel>Password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            />
        </FormControl> */}
        </div>
       </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          LOGIN
        </Button>
      </CardActions>
      <Typography variant="body2" color="text.secondary" align="center">
        Don't have an account? 
        {/* <Link to="/register">Register now</Link> */}
      </Typography>
    </Card>
  );
}
