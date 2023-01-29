import React, {useState} from 'react';
import {
    FormContainer, FormGroup, FormLabel, FormInput, FormButton, Wrapper, Heading, SignInLink,
} from "./components/SignUpComponents";
import {
    isValidAddress,
    isValidDateOfBirth, isValidEmail,
    isValidName,
    isValidPassword,
    isValidTPNO
} from "../../utils/studentValidations";
import {displayErrors} from "../../utils/toasts";
import {ToastContainer} from "react-toastify";


const SignUp = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const validate=(firstName:string,lastName:string,email:string,password:string,confirmPassword:string)=> {
        const errors: string[] = []
        if (!isValidName(firstName).state) {
            errors.push(isValidName(firstName).error)
        }
        if (!isValidName(lastName).state) {
            errors.push(isValidName(lastName).error)
        }
        if (!isValidEmail(email).state) {
            errors.push(isValidEmail(email).error)
        }
        if (password === confirmPassword){
            if (!isValidPassword(password).state) {
                errors.push(isValidPassword(password).error)
            }
    }else
    {
        errors.push('Password and Confirm password not equal!!!')
    }

        return errors
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(firstName,email,password,confirmPassword);
        const errors:string[] = validate(firstName,lastName,email,password,confirmPassword);
        console.log(errors)
        if(errors.length!==0){
            displayErrors(errors);
        }
    }


    return (
        <Wrapper>
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
            <FormContainer onSubmit={handleSubmit}>
                <Heading>Sign Up</Heading>
                <FormGroup>
                    <FormLabel htmlFor="firstName">First Name:</FormLabel>
                    <FormInput
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel htmlFor="lastName">Last Name:</FormLabel>
                    <FormInput
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel htmlFor="email">Email:</FormLabel>
                    <FormInput
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel htmlFor="password">Password:</FormLabel>
                    <FormInput
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="confirmpassword">Confirm Password:</FormLabel>
                    <FormInput
                        id="confirmpassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </FormGroup>
                <FormButton>Sign UP</FormButton>
                <SignInLink to={'/'}>Back to Sign In</SignInLink>
            </FormContainer>
        </Wrapper>











    );
}


export default SignUp;