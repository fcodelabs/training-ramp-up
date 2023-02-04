import React, {useState} from 'react';
import {
    FormContainer, FormGroup, FormLabel, FormInput, FormButton, Wrapper, Heading, SignInLink,
} from "./components/SignInComponents";
import {
    isValidAddress,
    isValidDateOfBirth,
    isValidEmail,
    isValidName,
    isValidPassword,
    isValidTPNO
} from "../../utils/studentValidations";
import {displayErrors} from "../../utils/toasts";
import {ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {signInUser} from "./signInSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";


const SignIn = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const signIn = useAppSelector(
        (state) => {
            return state.persistedReducer.userData.signIn;
        }
    );

    const validate = (firstName: string, lastName: string, email: string, password: string, confirmPassword: string) => {
        const errors: string[] = []


        if (!isValidEmail(email).state) {
            errors.push(isValidEmail(email).error)
        }

        if (!isValidPassword(password).state) {
            errors.push(isValidPassword(password).error)
        }


        return errors
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors: string[] = validate(firstName, lastName, email, password, confirmPassword);
        if (errors.length !== 0) {
            displayErrors(errors);
        }else{

             dispatch(signInUser({
                email,
                password,
                 navigate
                }))

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
                <Heading>Sign In</Heading>

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
                <FormButton>Sign In</FormButton>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <SignInLink to={'/signup'}>Don't you have account? Sign Up here!</SignInLink>
            </FormContainer>
        </Wrapper>


    );
}


export default SignIn;