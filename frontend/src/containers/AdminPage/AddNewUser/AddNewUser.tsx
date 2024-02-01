// TopBox.js
import React from "react";
import { Box, Button } from "@mui/material";
import styled from "styled-components";

const StyledTopBox = styled(Box)`
  &&& {
    display: flex;

    align-self: center;
    justify-content: flex-end;
    background-color: rgba(33, 150, 243, 0.08);
    border-radius: 4px;
    padding: 12px;
  }
`;

const StyledAddNewUserButton = styled(Button)`
  &&& {
    background-color: #2196f3;
    color: #ffffff;
    font-family: Roboto;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.4px;
  }
`;

interface ITopBoxProps {
  handleAddClick: () => void;
}

const AddNewUser: React.FC<ITopBoxProps> = ({ handleAddClick }) => {
  return (
    <StyledTopBox>
      <StyledAddNewUserButton variant="contained" onClick={handleAddClick}>
        Add New User
      </StyledAddNewUserButton>
    </StyledTopBox>
  );
};

export default AddNewUser;
