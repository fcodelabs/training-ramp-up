import styled from 'styled-components';
import {Link} from "react-router-dom";


export const LogoutButton = styled.button`
  width: 5vw;
  height: 90%;
  padding: 10px;
  background-color: #af4c4c;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;

  &:hover {
    background-color: #3e8e41;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5vh;
  width: 100%;
  background-color: #010456;
`

export const UserName = styled.h4`
  color: aliceblue;
  width: 10vw;
  text-align: center;
`






