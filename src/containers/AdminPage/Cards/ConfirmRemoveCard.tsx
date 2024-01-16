import React from "react";
import { Box, Typography, Button } from "@mui/material";
import styled from "styled-components";
import "@fontsource/roboto";

const StyledDialogBox = styled(Box)`
    &&& {
        width: 444px;
        height: 110px;
        border-radius: 12px;
        box-shadow: 
            0px 11px 15px -7px #00000033,
            0px 24px 38px 3px #00000024,
            0px 9px 46px 8px #0000001F;
    }
`;

const StyledTypographyBox = styled(Typography)`
    &&& {
        width: 396px;
        height: 26px;
        padding: 16px 24px;
        
    
    }
`;

const StyledTypography = styled(Typography)`
    &&& {
        font-family: Roboto;
        font-weight: 400;
        font-size: 16px;
        line-height: 25.6px;
        Letter-spacing: 0.15px;
    
    }
`;

const StyledDismissButton = styled(Button)`
    &&& {
        width: 58px;
        height: 24px;
        padding: 6px 8px;
        border-radius: 4px;
        color:#9C27B0;
        font-family: Roboto;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        Letter-spacing: 0.4px;
        gap: 8px;
    }
`;

const StyledConfirmButton = styled(Button)`
    &&& {
        width: 58px;
        height: 24px;
        padding: 6px 8px;
        border-radius: 4px;
        color:#2196F3;
        font-family: Roboto;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        Letter-spacing: 0.4px;
        
    }
`;

const StyledButtonBox = styled(Box)`
    &&& {
        display: flex;
        justify-content: flex-end;
        padding: 8px;
        gap: 8px;
    }
`;

interface IDiscardChangesCardProps {
    onConfirm: () => void;
    onDismiss: () => void;
}

const ConfirmRemoveCard: React.FC<IDiscardChangesCardProps>  = ({ onConfirm, onDismiss }) => {
    return (
    

  <StyledDialogBox>
    <StyledTypographyBox>
    <StyledTypography>
    Are you sure you want to remove this student?
    </StyledTypography>
    </StyledTypographyBox>
    <StyledButtonBox>
        <StyledDismissButton variant="text" onClick={onDismiss}>DISSMISS</StyledDismissButton>
        <StyledConfirmButton variant="text" onClick={onConfirm}>CONFIRM</StyledConfirmButton>
    </StyledButtonBox>
  </StyledDialogBox>
    );   
};

export default ConfirmRemoveCard;