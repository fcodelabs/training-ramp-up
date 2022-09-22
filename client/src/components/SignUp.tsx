import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../state/slices';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUpDataInputType, signupInputDataValidator } from "../interfaces";

export default function SignUp() {

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpDataInputType>({
    resolver:zodResolver(signupInputDataValidator),
  });

  const onSubmit = (data:SignUpDataInputType)=>{
    dispatch(signUpUser({...data}));
  };
  return (
      <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                margin="normal"
                fullWidth
                label="Name"
                autoFocus
                {...register("name",{required:"Required Field"})}
                error = {!!errors?.name}
                helperText={errors?.name ? errors.name.message:null}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Email"
                autoComplete="email"
                {...register("email",{required:"Required Field"})}
                error = {!!errors?.email}
                helperText={errors?.email ? errors.email.message:null}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                {...register("password",{required:"Required Field"})}
                error = {!!errors?.password}
                helperText={errors?.password ? errors.password.message:null}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 ,py:2}}
              >
                Sign Up
              </Button>
            </form>
          </Box>
      </Container>
  );
}