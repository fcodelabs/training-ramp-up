import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './SignUpPage.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { LoginDetails } from '../../utils/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAction } from './SignUpSlice';

const SignUpPage = () => {
  const [emailError, setEmailError] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [passwordError, setpasswordError] = React.useState('');

  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const pageName = 'signUpPage';
  const user = useSelector((state: any) => state.signUp.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (user === true) {
      navigate('/Home');
    }
  });
  const openSignInPage= () => {
    navigate('/');
  };
  function checkInputValidation(dataItem: LoginDetails) {
    const email = /^[A-z2-9]+@[A-z2-9]+\.[A-z2-9]+$/;
    const name = /^[A-z]{2,20}$/;
    const password = /^[A-z,0-9 _]{4,10}$/;
    let fieldStatus: boolean = false;

    if (dataItem.email !== undefined && email.test(dataItem.email)) {
      fieldStatus = true;
    } else {
      fieldStatus = false;
      setEmailError('Enter valid Email,(abc@abc.com)');
      return;
    }

    if (dataItem.name !== undefined && name.test(dataItem.name)) {
      fieldStatus = true;
    } else {
      fieldStatus = false;
      setNameError('Check valid Name');
      return;
    }

    if (dataItem.password !== undefined && password.test(dataItem.password)) {
      fieldStatus = true;
    } else {
      fieldStatus = false;
      setpasswordError('Check valid Password');
      return;
    }

    return fieldStatus;
  }
  function SignUpFunction(){
    const loginPerson = { email, name, password, pageName };
    if (checkInputValidation(loginPerson)) {
      dispatch(registerUserAction(loginPerson));
    }
  }
  function checkValidation(field: string, value: string) {
    const email = /^[A-z2-9]+@[A-z2-9]+\.[A-z2-9]+$/;
    const name = /^[A-z]{2,20}$/;
    const password = /^[A-z,0-9 _]{4,10}$/;
    switch (field) {
    case 'Email':
      if ( email.test(value)) {
        setEmailError('');
        setEmail(value);
      } else {
        setEmailError('Enter valid Email,(abc@abc.com)');
        setEmail(value);
      }
      break;

    case 'Name':
      if (name.test(value)) {
        setNameError('');
        setName(value);
      } else {
        setNameError('Check valid Name');
        setName(value);
      }
      break;

    case 'Password':
      if ( password.test(value)) {
        setpasswordError('');
        setPassword(value);
      } else {
        setpasswordError('Check valid Password');
        setPassword(value);
      }
      break;
    }
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid style={{ overflow: 'hidden' }} container spacing={2} columns={16}>
          <Grid xs={16} item={true}>
            <div className="mainPage">
              <div className="fieldsArea">
                <h2 className="labletxt">Register</h2>

                {/* sign up fields */}
                <TextField
                  error={emailError !== ''}
                  className="txtField emailField"
                  id="filled-search2"
                  label="Email"
                  type="Email"
                  value={email}
                  variant="filled"
                  helperText={emailError}
                  size="small"
                  onChange={(e) => {
                    checkValidation('Email', e.target.value);
                  }}
                />
                <TextField
                  error={nameError !== ''}
                  className="txtField nameField"
                  id="filled-search2"
                  label="Name"
                  type="name"
                  value={name}
                  variant="filled"
                  helperText={nameError}
                  size="small"
                  onChange={(e) => {
                    checkValidation('Name', e.target.value);
                  }}
                />
                <TextField
                  error={passwordError !== ''}
                  className="txtField passwordField"
                  id="outlined-password-input2"
                  label="Password"
                  type="password"
                  variant="filled"
                  value={password}
                  autoComplete="current-password"
                  helperText={passwordError}
                  size="small"
                  onChange={(e) => {
                    checkValidation('Password', e.target.value);
                  }}
                />

                <Button
                  className="btn signInBtn"
                  variant="contained"
                  onClick={SignUpFunction}
                >
                  Sign up
                </Button>

                <Button
                  className="btn signUpBtn"
                  variant="outlined"
                  onClick={openSignInPage}
                >
                  Back
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SignUpPage;
