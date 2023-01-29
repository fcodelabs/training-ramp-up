import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5vh;
  width: 100vw;
  background-color: #010456;
`

export const UserName = styled.h3`
  color: aliceblue;
  margin: 5px;
  padding: 5px;
`
export const LogoutButton = styled.button`
  width: 5%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  font-size: 13px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
  &:hover {
    background-color: #3e8e41;
  }
`;