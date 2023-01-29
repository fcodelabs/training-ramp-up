import styled from 'styled-components';
import {Link} from "react-router-dom";


export const FormContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 50%;
  background-color: gainsboro;
  border-radius: 25px;
  padding: 20px;
`;

export const FormGroup = styled.div`
  flex: 1;
  margin: 10px;
  min-width: 70%;
  min-height: 50px;
  //@media (max-width: 768px) {
  //  min-width: 80%;
  //}
`;

export const FormLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;

export const FormInput = styled.input`
  width: 98%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
`;

export const FormButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #3e8e41;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #010456;
`

export const Heading = styled.h1`
  color: #d35959;
  width: 100%;
  text-align: center;
`

export const SignInLink = styled(Link)`
  color: #4379de;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;




