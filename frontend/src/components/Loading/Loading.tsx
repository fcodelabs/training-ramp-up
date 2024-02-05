import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "styled-components";

const StyledCircularProgress = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const LoadingComponent = () => {
  return (
    <StyledCircularProgress>
      <CircularProgress />
    </StyledCircularProgress>
  );
};

export default LoadingComponent;
